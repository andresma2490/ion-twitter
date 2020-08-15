import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { Tweet } from '../models/tweet';

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  tweetCollection: AngularFirestoreCollection;
  tweetDocument: AngularFirestoreDocument;
  tweets: Observable<Tweet[]>;
  urlImage: Observable<string>;
  userDocument;

  constructor(private db:AngularFirestore, private storage:AngularFireStorage, private userService:UserService){
    this.tweetCollection = db.collection('tweets');
    this.tweets = this.tweetCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Tweet;
        data.id = a.payload.doc.id;
         return data;
      });
    }));    
  } 

  getTweets(){
    return this.tweets;
  }

  addTweet(tweet:Tweet){
    tweet.userId = this.userService.getUser().email;
    tweet.create_date = new Date();
    tweet.likes = 0;
    
    this.tweetCollection.add(tweet);
  }

  editTweet(tweet:Tweet){
    tweet.update_date = new Date();

    this.tweetDocument = this.db.doc(`tweets/${tweet.id}`);
    this.tweetDocument.update(tweet); 
  }

  deleteTweet(tweet:Tweet){
    this.tweetDocument = this.db.doc(`tweets/${tweet.id}`);
    this.tweetDocument.delete(); 
  }

  onUpload(event){
    const file = event.target.files[0];
    const storageRef = this.storage.ref(`/tweets/${ file.name }`);
    const task = storageRef.put(file);
    task.snapshotChanges().pipe(finalize(() => this.urlImage = storageRef.getDownloadURL())).subscribe();
    
    return this.urlImage;
  }

  likeTweet(tweet:Tweet){
    this.db.doc(`tweets/${tweet.id}`).update({ likes: tweet.likes });
  }

}
