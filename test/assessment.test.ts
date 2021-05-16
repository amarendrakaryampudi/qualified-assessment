import {User, Moderator, Admin, Comment} from "../src/assessment";

describe('OOP Tests', function() {

  it('example tests', () => {
    let user = new User("User 1");
    expect(user.getName()).toEqual('User 1');
    
    
  });
  
  it('login test', async () => {
    var user1 = new User('user1');
    const logInPromise = user1.logIn();
    expect(user1.isLoggedIn()).toEqual(false);
    await expect(logInPromise).resolves.not.toThrow();
    expect(user1.isLoggedIn()).toEqual(true);
    expect(user1.getLastLoggedInAt()).toBeInstanceOf(Date);
    let lastLoggedInDate = user1.getLastLoggedInAt();
    user1.logOut();
    expect(user1.isLoggedIn()).toEqual(false);
    expect(user1.getLastLoggedInAt()).toEqual(lastLoggedInDate);
  });

});