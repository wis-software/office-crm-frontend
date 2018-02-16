import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

@Injectable()
export class ProfileService {
  constructor(private apollo: Apollo) { }

  public getProfiles() {
    return this.apollo.query<any>({
      query: gql`
        query {
          employees {
            id
            firstName
            lastName
            specializations {
              name
            }
            notes
          }
        }
      `,
    })
    .pipe(
      map(results => results.data)
    );
  };

}
