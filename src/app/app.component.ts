import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { from, of, combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'web-angular-firestore';
  constructor(
    private fb: FirebaseService
  ) {

  }

  ngOnInit() {
    const stocks: firebase.firestore.CollectionReference = this.fb.db.collection('stock');

    from(stocks.get()).pipe(
      switchMap((snapshot: firebase.firestore.QuerySnapshot) => {
        const a = snapshot.docs.map(stockDoc => {
          const stockData = stockDoc.data();
          const docCardId: firebase.firestore.DocumentReference = stockData.cardId;
          return from(docCardId.get()).pipe(
            map((card) => ({
              cardId: card.id,
              cardName: card.data().name,
              quantity: stockData.quantity,
              price: stockData.price
            }))
          );
        });
        return combineLatest(...a);
      })
    ).subscribe({
      next: (a) => {
        console.log(a);
      }
    });
  }
}
