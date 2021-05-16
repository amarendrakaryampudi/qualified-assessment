export class User {
    private name : string;
    private loggedIn : boolean;
    private lastLoggedInAt !: Date; //Bypassing the strict class checking functionality with '!', as lastLoggedInAt cannot be defined before the first login

    //Initializing the class variables with constructor. lastLoggedInAt is not initialized here as it cannot be defined before first login.
    constructor(name: string) {
        this.name = name;
        this.loggedIn = false;
    }
  
    isLoggedIn() : boolean {
        return this.loggedIn;
    }
    
    getLastLoggedInAt() : Date {
        return this.lastLoggedInAt;
    }
    
    //As we intend to perform the login asynchronously with promise, the return type is being set to Promise
    logIn() : Promise<string> {
        var loginResult = new Promise<string> ((resolve, reject) => {
            if(this.loggedIn)
                reject('Already logged in');
            else
                resolve('Login successful');
        });

        //Handling only fulfilled state but not the rejected state, as we are not capturing any failed login attempts
        loginResult.then(() => {
            this.loggedIn = true;
            this.lastLoggedInAt = new Date();
        });

        return loginResult;
    }
    
    logOut() : void {
        this.loggedIn = false;
    }
  
    getName() : string {
        return this.name;
    }
    
    setName(name: string) : void {
        this.name = name;
    }
  
    //Returns true only for those comments created by this user.
    canEdit(comment: Comment) : boolean {
        if(this == comment.getAuthor())
            return true;
        else
            return false;
    }
    
    canDelete(comment: Comment) {
      return false;
    }

  }
  
  //Using inheritance: As Moderator is a specific type of User, it uses User as the super class
  export class Moderator extends User {
     
    //Skipping the constructor method as Moderator do not need any variables other than those used in User class

    canDelete(comment: Comment) {
        return true;
      }
  }
  
  //Using inheritance: As Admin is a specific type of Moderator, it uses Moderator as the super class
  export class Admin extends Moderator {

    //skipping the constructor for the same reason as that of Moderator class

    canEdit(comment: Comment) : boolean {
        return true;
    }

  }
  
  
  export class Comment {

    private author : User;
    private message : string;
    private repliedTo ?: Comment;   //This is an optional variable
    private createdAt : Date;

    //Initializing the class variables with a constructor. As repliedTo is optional, it is assigned only when passed as an argument.
    constructor(author: User, message: string, repliedTo?: Comment) {
        this.author = author;
        this.message = message;
        if(repliedTo)
            this.repliedTo = repliedTo;
        this.createdAt = new Date();
    }
  
    getMessage() : string {
        return this.message;
    }
    
    setMessage(message: string) : void {
        this.message = message;
    }
    
    getCreatedAt() : Date {
        return this.createdAt;
    }
    
    getAuthor() : User {
        return this.author;
    }
    
    // Return type is configured as any for getRepliedTo() because repliedTo can be null for direct comments and can be a comment for reply comments
    getRepliedTo() : any {
        return this.repliedTo;
    }
    
    toString() : string {
        if(this.repliedTo)
            return `${this.message} by ${this.author.getName()} (replied to ${this.repliedTo.author.getName()})`;
        else
            return `${this.message} by ${this.author.getName()}`;
    }
  }
