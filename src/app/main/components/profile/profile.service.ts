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
        query{
          employees {
            id
            firstName
            middleName
            lastName
            birthday
            workStarted
            position {
              id
              name
            }
            phoneNumber
            additionalPhoneNumber
            contactEmail
          }
        }
      `,
    })
    .pipe(
      map(results => results.data)
    );
  };

}
