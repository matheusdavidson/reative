import { Records } from './server';
import { FirestoreStub, FirebaseStub } from '../drivers/stub';
import { ReativeDriverOption } from '../interfaces/driver';
import { Logger } from '../utils/logger';
import { Subject, Observable } from 'rxjs';
import { ReativeVerb } from '../interfaces/verb';
import { RR_DRIVER } from '../driver';

class RecordsMock extends Records {
  constructor(options) {
    super(options);
  }

  public createKey(verb = 'find', path = '', body = {}): string {
    return super.createKey(verb, path, body);
  }

  public call$(
    method: ReativeVerb,
    path: string = '',
    payload: any = {},
    chain = this.cloneChain(),
    key: string = ''
  ) {
    return super.call(method, path, payload, chain, key);
  }

  public cloneChain() {
    return super.cloneChain();
  }
}

describe('Records', () => {
  let lib: Records;
  const baseURL = 'http://reative.dev';
  const collection = 'foo-collection';

  beforeEach(() => {
    const firestoreStub = FirestoreStub({
      get: Promise.resolve({
        forEach: () => {}
      }),
      set: Promise.resolve(true),
      update: Promise.resolve(true),
      onSnapshot: (success, error) => {
        console.log(123, success);
      }
    });

    lib = new Records({
      useLog: false,
      baseURL: baseURL,
      collection: collection,
      connector: {
        firestore: firestoreStub,
        firebase: FirebaseStub({}).firebase
      }
    });
  });

  it('should be created using minimal setup', () => {
    lib = new Records({ useLog: false });
    expect(lib).toBeTruthy();
  });

  it('should initialise with cache disabled', () => {
    lib = new Records({ useLog: false, useCache: false });
    expect(lib).toBeTruthy();
    //
    // and/or
    lib.init({ chain: { useCache: false } });
    expect(lib).toBeTruthy();
  });

  // it('should initialise with logs disabled', () => {
  //   lib = new Records({ useLog: false });
  //   lib.init({ useLog: false, useLogTrace: false });
  //   expect(lib).toBeTruthy();
  // });

  // it('should fail for unknown drivers', () => {
  //   expect(() => {
  //     lib
  //       .driver('unknown' as ReativeDriverOption)
  //       .find()
  //       .toPromise();
  //   }).toThrowError('[find] method unavailable for driver [unknown]');
  // });

  // it('should implement `find` method', () => {
  //   const spy = jest.spyOn(Records.prototype, 'find');
  //   lib.find().toPromise();
  //   expect(spy).toBeCalled();
  // });

  // it('should implement `findOne` method', () => {
  //   const spy = jest.spyOn(Records.prototype, 'findOne');
  //   lib.findOne().toPromise();
  //   expect(spy).toBeCalled();
  // });

  // it('should implement `set` method', () => {
  //   const spy = jest.spyOn(Records.prototype, 'set');
  //   lib.set('some_id', { some: 'data' }).toPromise();
  //   expect(spy).toBeCalled();

  //   lib.set('some_id', { some: 'data' }, false).toPromise();

  //   expect(spy).toBeCalledWith('some_id', { some: 'data' }, false);
  // });

  // it('should implement `update` method', () => {
  //   const spy = jest.spyOn(Records.prototype, 'update');
  //   lib.update('some_id', { some: 'data' }).toPromise();
  //   expect(spy).toBeCalled();
  // });

  // it('should implement `on` method', () => {
  //   const spy = jest.spyOn(Records.prototype, 'on');
  //   lib.on(r => {}, r => {});
  //   expect(spy).toBeCalled();
  // });

  // it('should return `firebase` connector instance', () => {
  //   lib = new Records({
  //     useLog: false,
  //     baseURL: baseURL,
  //     collection: collection,
  //     connector: {
  //       firestore: { _: 'firestore instance' },
  //       firebase: { _: 'firebase instance' }
  //     }
  //   });
  //   expect(lib.firebase()).toEqual({ _: 'firebase instance' });
  // });

  // it('should return `firestore` connector instance', () => {
  //   lib = new Records({
  //     useLog: false,
  //     baseURL: baseURL,
  //     collection: collection,
  //     connector: {
  //       firestore: { _: 'firestore instance' },
  //       firebase: { _: 'firebase instance' }
  //     }
  //   });
  //   expect(lib.firestore()).toEqual({ _: 'firestore instance' });
  // });

  // it('should return `storage` adapter', () => {
  //   lib = new Records({
  //     useLog: false,
  //     baseURL: baseURL,
  //     collection: collection
  //   });
  //   lib.init({ storage: { _: 'adapter' } } as any);
  //   expect(lib.cache()).toEqual({ _: 'adapter' });
  // });

  // it('should clear cache', () => {
  //   lib = new Records({
  //     useLog: false,
  //     baseURL: baseURL,
  //     collection: collection
  //   });

  //   const spy = jest.spyOn(Records.prototype, 'clearCache');
  //   lib.init({ storage: { _: 'adapter' } } as any);
  //   lib.clearCache();

  //   expect(spy).toBeCalled();
  // });

  // it('should feed collections', () => {
  //   lib = new Records({
  //     useLog: false,
  //     baseURL: baseURL,
  //     collection: collection
  //   });

  //   const spy = jest.spyOn(Records.prototype, 'feed');
  //   lib.init();
  //   lib.feed();

  //   expect(spy).toBeCalled();
  // });

  // it('should not reinitialise drivers', () => {
  //   const lib_ = new Records({
  //     useLog: false,
  //     baseURL: baseURL,
  //     collection: collection,
  //     connector: {
  //       http: { _: 'http instance' },
  //       firebase: { _: 'firebase instance' },
  //       firestore: { _: 'firestore instance' }
  //     }
  //   });
  //   const spy = jest.spyOn(Records.prototype, 'driverInit' as any);

  //   lib_.firebase();
  //   lib_.firebase();
  //   lib_.firebase();

  //   expect(spy).toBeCalledTimes(1);
  // });

  // it('should initialise with `firestore` as a default driver', () => {
  //   const lib_ = new Records({
  //     useLog: false,
  //     baseURL: baseURL,
  //     collection: collection,
  //     connector: {
  //       http: { _: 'http instance' },
  //       firebase: { _: 'firebase instance' },
  //       firestore: { _: 'firestore instance' }
  //     }
  //   });
  //   lib_.init({ driver: '' } as any);
  //   expect(lib_.driver()).toEqual('firestore');
  // });

  // it('should fail when verbs and drivers does not match', () => {
  //   const lib_ = new Records({
  //     useLog: false,
  //     baseURL: baseURL,
  //     collection: collection,
  //     connector: {
  //       http: { _: 'http instance' },
  //       firebase: { _: 'firebase instance' },
  //       firestore: { _: 'firestore instance' }
  //     }
  //   });

  //   lib_.init();

  //   expect(() => {
  //     lib_.driver('http').on(() => {}, () => {});
  //   }).toThrowError('[on] method unavailable for driver [http]');
  // });

  // it('should use log', () => {
  //   lib.init({
  //     logger: new Logger({
  //       subject: new Subject(),
  //       useLog: false,
  //       useLogTrace: false
  //     })
  //   } as any);

  //   expect(lib.useLog(false)).toBeInstanceOf(Records);
  //   expect(lib.useLogTrace(true)).toBeInstanceOf(Records);
  // });

  // it('should create unique keys', () => {
  //   let lib_ = new RecordsMock({
  //     useLog: false,
  //     baseURL: baseURL,
  //     collection: collection,
  //     endpoint: '/',
  //     connector: {
  //       http: { _: 'http instance' },
  //       firebase: { _: 'firebase instance' },
  //       firestore: { _: 'firestore instance' }
  //     }
  //   });
  //   lib_.init();

  //   expect(lib_.createKey()).toEqual(
  //     'foo-collection://4e1962db069405d0b641f185d3d13eadf1eaff7e85b477abd6239b1d62e596bb'
  //   );
  //   expect(
  //     lib_.createKey('post', 'path/to/data/source', { a: 1, b: 2, c: 3 })
  //   ).toEqual(
  //     'foo-collection://path/to/data/source/01ebc7d3672dd189de1e1369b5ed5a89450d8f8fdd8cad538f621446bd7424cb'
  //   );

  //   lib_ = new RecordsMock({
  //     useLog: false,
  //     baseURL: baseURL,
  //     endpoint: '/',
  //     // collection: collection, // with no collection
  //     connector: {
  //       http: { _: 'http instance' },
  //       firebase: { _: 'firebase instance' },
  //       firestore: { _: 'firestore instance' }
  //     }
  //   });
  //   lib_.init();

  //   expect(
  //     lib_.createKey('patch', 'path/to/data/source', { a: 1, b: 2, c: 3 })
  //   ).toEqual(
  //     'rr://path/to/data/source/dc262997f46201481d732d0b9d0dfe24764f91b4a21272bf68b10577942c2c0c'
  //   );
  // });

  // it('should implement [get] verb', () => {
  //   let lib_ = new RecordsMock({
  //     useLog: false,
  //     baseURL: baseURL,
  //     endpoint: '/',
  //     collection: collection,
  //     connector: {
  //       http: { get: () => Promise.resolve([1, 2, 3]) }
  //     }
  //   });
  //   const spy = jest.spyOn(Records.prototype, 'get');
  //   lib_
  //     .get()
  //     .toPromise()
  //     .then(r =>
  //       expect(r).toEqual({
  //         collection: 'foo-collection',
  //         data: [1, 2, 3],
  //         driver: 'http',
  //         key:
  //           'foo-collection://0c023abe328e9c53d23457a7f698b38e370e0a83d081ba7779b91dd3b45cbf7b',
  //         response: [1, 2, 3]
  //       })
  //     );
  //   lib_.get('').toPromise();
  //   expect(spy).toBeCalledTimes(2);
  // });

  // it('should implement [post] verb', () => {
  //   let lib_ = new RecordsMock({
  //     useLog: false,
  //     baseURL: baseURL,
  //     endpoint: '/',
  //     collection: collection,
  //     connector: {
  //       http: { post: () => Promise.resolve([1, 2, 3]) }
  //     }
  //   });
  //   const spy = jest.spyOn(Records.prototype, 'post');
  //   lib_
  //     .post()
  //     .toPromise()
  //     .then(r =>
  //       expect(r).toEqual({
  //         collection: 'foo-collection',
  //         data: [1, 2, 3],
  //         driver: 'http',
  //         key:
  //           'foo-collection://0c023abe328e9c53d23457a7f698b38e370e0a83d081ba7779b91dd3b45cbf7b',
  //         response: [1, 2, 3]
  //       })
  //     );
  //   lib_.post('').toPromise();
  //   lib_.post('', { a: 1, b: 2, c: 3 }).toPromise();
  //   expect(spy).toBeCalledTimes(3);
  // });

  // it('should implement [patch] verb', () => {
  //   let lib_ = new RecordsMock({
  //     useLog: false,
  //     baseURL: baseURL,
  //     endpoint: '/',
  //     collection: collection,
  //     connector: {
  //       http: { patch: () => Promise.resolve([1, 2, 3]) }
  //     }
  //   });
  //   const spy = jest.spyOn(Records.prototype, 'patch');
  //   lib_
  //     .patch()
  //     .toPromise()
  //     .then(r =>
  //       expect(r).toEqual({
  //         collection: 'foo-collection',
  //         data: [1, 2, 3],
  //         driver: 'http',
  //         key:
  //           'foo-collection://0c023abe328e9c53d23457a7f698b38e370e0a83d081ba7779b91dd3b45cbf7b',
  //         response: [1, 2, 3]
  //       })
  //     );
  //   lib_.patch('').toPromise();
  //   lib_.patch('', { a: 1, b: 2, c: 3 }).toPromise();
  //   expect(spy).toBeCalledTimes(3);
  // });

  // it('should implement [delete] verb', () => {
  //   let lib_ = new RecordsMock({
  //     useLog: false,
  //     baseURL: baseURL,
  //     endpoint: '/',
  //     collection: collection,
  //     connector: {
  //       http: { delete: () => Promise.resolve([1, 2, 3]) }
  //     }
  //   });
  //   const spy = jest.spyOn(Records.prototype, 'delete');
  //   lib_
  //     .delete()
  //     .toPromise()
  //     .then(r =>
  //       expect(r).toEqual({
  //         collection: 'foo-collection',
  //         data: [1, 2, 3],
  //         driver: 'http',
  //         key:
  //           'foo-collection://a2e6d09860274a6824131858958a4f0eaf2f865d3542486254e82fbe37d8ca64',
  //         response: [1, 2, 3]
  //       })
  //     );
  //   lib_.delete('').toPromise();
  //   lib_.delete('', { a: 1, b: 2, c: 3 }).toPromise();
  //   expect(spy).toBeCalledTimes(3);
  // });

  // it('should implement [http] chaining', () => {
  //   expect(
  //     lib.http(config => (config.headers['token'] = 'a1b2c3'))
  //   ).toBeInstanceOf(Records);
  // });

  // it('should implement [useNetwork] chaining', () => {
  //   expect(lib.useNetwork(true)).toBeInstanceOf(Records);
  // });

  // it('should implement [saveNetwork] chaining', () => {
  //   expect(lib.saveNetwork(false)).toBeInstanceOf(Records);
  // });

  // it('should implement [transformResponse] chaining', () => {
  //   expect(lib.transformResponse(r => r.data)).toBeInstanceOf(Records);
  // });

  // // @todo scheduled to remove in favor of `transformResponse`
  // it('should implement [transformNetwork] chaining', () => {
  //   expect(lib.transformNetwork(r => r.data)).toBeInstanceOf(Records);
  // });

  // it('should implement [ttl] chaining', () => {
  //   expect(
  //     lib.ttl(60) // in seconds
  //   ).toBeInstanceOf(Records);
  // });

  // it('should implement [transformCache] chaining', () => {
  //   expect(lib.transformCache(r => r.data)).toBeInstanceOf(Records);
  // });

  // it('should implement [key] chaining', () => {
  //   expect(lib.key('yo!')).toBeInstanceOf(Records);
  // });

  // it('should implement [query] chaining', () => {
  //   expect(
  //     lib.query([{ field: 'uid', operator: '==', value: 'a1b2c3' }])
  //   ).toBeInstanceOf(Records);
  // });

  // it('should implement [where] chaining', () => {
  //   expect(lib.where('uid', '==', 'a1b2c3')).toBeInstanceOf(Records);

  //   const lib_ = new RecordsMock({
  //     useLog: false,
  //     baseURL: baseURL,
  //     collection: collection,
  //     connector: {
  //       firestore: {
  //         where: () => {},
  //         collection: () => {
  //           return {
  //             where: () => {
  //               return {
  //                 where: () => {
  //                   return {
  //                     get: () =>
  //                       Promise.resolve([
  //                         {
  //                           data: () => {
  //                             return { a: 1, b: 2, c: 3 };
  //                           }
  //                         }
  //                       ])
  //                   };
  //                 }
  //               };
  //             }
  //           };
  //         }
  //       },
  //       firebase: { _: 'instance' }
  //     }
  //   });

  //   const request = lib_
  //     .query([{ field: 'a', operator: 'b', value: 'c' }])
  //     .where('uid', '==', 'a1b2c3');

  //   expect(request).toBeInstanceOf(Records);

  //   const spy = jest.spyOn(Records.prototype, 'call' as any);

  //   const chain = lib_.cloneChain();

  //   expect(chain).toEqual({
  //     query: [
  //       { field: 'a', operator: 'b', value: 'c' },
  //       { field: 'uid', operator: '==', value: 'a1b2c3' }
  //     ]
  //   });

  //   request.find().toPromise();
  //   expect(spy).toBeCalledWith('find');
  // });

  // it('should implement [sort] chaining', () => {
  //   expect(lib.sort({ created_at: 'desc' })).toBeInstanceOf(Records);
  //   lib.reboot();
  //   expect(
  //     lib.sort({ created_at: 'desc' }).sort({ updated_at: 'desc' })
  //   ).toBeInstanceOf(Records);
  // });

  // it('should implement [size] chaining', () => {
  //   expect(lib.size(54)).toBeInstanceOf(Records);
  // });

  // it('should implement [ref] chaining', () => {
  //   expect(lib.ref('path/to/firebase/ref')).toBeInstanceOf(Records);
  // });

  // it('should implement [data] chaining', () => {
  //   expect(lib.data(true)).toBeInstanceOf(Records);
  // });

  // it('should implement [doc] chaining', () => {
  //   expect(lib.doc('a1b2c3')).toBeInstanceOf(Records);
  // });

  // it('should implement [reset] chaining', () => {
  //   expect(lib.reset()).toBeInstanceOf(Records);
  // });

  // it('should implement [reboot] chaining', () => {
  //   lib.init({ driver: 'firebase' });
  //   lib.reboot();
  //   expect(lib.driver()).toEqual(RR_DRIVER);
  // });

  // it('should call network with a customized key', () => {
  //   let lib_ = new RecordsMock({
  //     useLog: false,
  //     baseURL: baseURL,
  //     endpoint: '/',
  //     collection: collection,
  //     connector: {
  //       http: { post: () => Promise.resolve([1, 2, 3]) },
  //       firebase: { _: 'firebase instance' },
  //       firestore: { _: 'firestore instance' }
  //     }
  //   });

  //   lib_
  //     .call$('post', 'path/to/data/source', {}, {}, 'my-custom-key')
  //     .toPromise();
  // });
});
