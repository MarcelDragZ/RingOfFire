import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  game: Game;
  gameEnd = false;
  gameID: string;

  dataCollection: AngularFirestoreCollection<any>;
  data: Observable<any[]>;

  constructor(
    private firestore: AngularFirestore,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.newGame();
    this.getFirestoreData();
  }

  getFirestoreData() {
    this.route.params.subscribe((params) => {
      this.gameID = params['id'];

      this.firestore
        .collection('games')
        .doc(this.gameID)
        .valueChanges()
        .subscribe((game: any) => {
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.stack = game.stack;
          this.game.players = game.players;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.currentCard = game.currentCard;
        });
    });
  }

  newGame() {
    this.game = new Game();
  }

  saveGame() {
    this.firestore
      .collection('games')
      .doc(this.gameID)
      .update(this.game.toJson());
  }

  takeCard() {
    if (this.game.players.length <= 1) {
      this.openDialog();
      return;
    }
    this.playGame();
  }

  playGame() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      this.updateCurrentPlayer();
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
        this.getGameStatus();
      }, 1500);
    }
  }

  updateCurrentPlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer =
      this.game.currentPlayer % this.game.players.length;
    if (Number.isNaN(this.game.currentPlayer)) {
      this.game.currentPlayer = 0;
    }
  }

  getGameStatus() {
    if (this.game.playedCards.length >= 50) {
      this.gameEnd = true;
      setTimeout(() => {
        this.firestore
        .collection('games')
        .doc(this.gameID)
        .delete();
        this.router.navigate(['/']);
      }, 4000);
    } else {
      return;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }

}
