import { Component, OnInit, Input } from '@angular/core';
import { Tweet } from 'src/app/models/tweet';
import { TweetService } from 'src/app/services/tweet.service';
import { UserService } from 'src/app/services/user.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss'],
})
export class TweetComponent implements OnInit {
  @Input() tweet:Tweet;
  editing:boolean;
  likeButton:boolean;
  urlImage: Observable<string>;

  constructor(private tweetService:TweetService, private userService:UserService, private storage:AngularFireStorage){
  }

  ngOnInit(){
    this.canEdit();
  }

  canEdit(){
    if(this.tweet.id){
      this.editing = false;
    }
    else{
      this.editing = true;
    }
  }

  isAuthor(){
    if(this.userService.getUser().email == this.tweet.userId){
      return true;
    }
    else{
      return false;
    }
  }

  likeTweet(){
    // observable actualiza el tweet con el like (likes infinitos)
    this.likeButton = !this.likeButton;   

    if(this.likeButton){
      this.tweet.likes = this.tweet.likes + 1;
      this.tweetService.likeTweet(this.tweet);
    }
    else{
      this.tweet.likes = this.tweet.likes - 1;
      this.tweetService.likeTweet(this.tweet);
    }
  }

  addOrEditTweet(){
    if(this.tweet.id){
      if(this.tweet.description){
        this.tweetService.editTweet(this.tweet);
      }
    }
    else{
      if(this.tweet.description){
        this.tweetService.addTweet(this.tweet);
        this.tweet = {} as Tweet;
      }
    }
  }

  deleteTweet(){
    if(window.confirm('are you sure?')){
      this.tweetService.deleteTweet(this.tweet);
    }
  }

  onUpload(event){
    const file = event.target.files[0];
    const storageRef = this.storage.ref(`/tweets/${ file.name }`);
    const task = this.storage.upload(`/tweets/${ file.name }`, file);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(urlImage =>{
            this.tweet.image = urlImage;
          })
        })
      ).subscribe()
  }

}
