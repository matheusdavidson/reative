import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PlayCollection } from '../../interfaces/collection.interface';
import {
  getAllCollections,
  getSelectedCollection
} from '../../+play/collection/collection.selectors';
import { select, Store } from '@ngrx/store';
import { PlayState } from '../../+play/play.reducer';
import { MatSelectChange } from '@angular/material';
import { UpdateChainCollection } from '../../+play/collection/collection.actions';

@Component({
  selector: 'rr-play-collection-chooser-container',
  templateUrl: './collection-chooser-container.component.html',
  styleUrls: ['./collection-chooser-container.component.css']
})
export class CollectionChooserContainerComponent implements OnInit, OnDestroy {
  collections$: Observable<PlayCollection[]>;

  selectedCollection$: Subscription;
  selectedCollection: PlayCollection = <PlayCollection>{};

  constructor(private store: Store<PlayState>) {}

  ngOnInit() {
    this.collections$ = this.store.pipe(select(getAllCollections));
    this.selectedCollection$ = this.store
      .pipe(select(getSelectedCollection))
      .subscribe((entry: PlayCollection) => (this.selectedCollection = entry));
  }

  ngOnDestroy() {
    this.selectedCollection$.unsubscribe();
  }

  didCollectionChange($event: MatSelectChange) {
    this.store.dispatch(new UpdateChainCollection($event.value));
  }
}