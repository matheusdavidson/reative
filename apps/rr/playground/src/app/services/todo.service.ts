import { Injectable } from '@angular/core';
import {
  Collection,
  Records,
  Response,
  Log
} from '@reative/records';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AddLog } from '../+state/log/log.actions';
export interface Todo extends Response<Todo> {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
@Collection({
  name: 'todos',
  endpoint: '/todos'
})
export class TodoService {
  $collection: Records;

  constructor(private store: Store) {
    // this.$collection.setHook('http.pre', (config: AxiosRequestConfig) => {
    //  config.headers['Authorization'] = `Bearer the-server-token`;
    // });

    this.$collection.$log.subscribe((log: Log) => {
      this.store.dispatch(new AddLog(log));
    });
  }

  find(): Observable<Todo> {
    return this.$collection.find<Todo>();
  }

  findOne(): Observable<Todo> {
    return this.$collection.findOne<Todo>();
  }
}
