import { HttpHeaders } from '@angular/common/http';

import { ApolloLink, concat } from 'apollo-link';
import { onError } from 'apollo-link-error';

export const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('jwt');

  if (token) {
    operation.setContext({
      headers: new HttpHeaders().set('Authorization', token)
    });
  }
  return forward(operation);
});

export const logoutLink = onError(({ networkError }) => {
  alert('Auth error');
  // if ((networkError as any).status === 401) { window.location.href = '/login'; }
});
