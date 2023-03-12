/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor() {}

  public users: Array<User> = [];

  public insertNewUser(user: User): void {
    this.users.push(user);
  }

  public updateUserData(userData: User): void {
    this.users = this.users.map((user) => {
      if (user.id == userData.id) {
        user.points = userData.points;
        user.multiplier = userData.multiplier;
      }
      return user;
    });
  }

  public userExit(clientId: string): void {
    this.users = this.users.filter((user) => user.id !== clientId);
  }

  public getUser(clientId: string): User {
    const client = this.users.filter((user) => user.id === clientId)[0];
    return client;
  }

  public checkIfUserHasId(clientId: string): boolean {
    return this.getUser(clientId) ? true : false;
  }

  public getAllUsers(): User[] {
    return this.users;
  }
}
