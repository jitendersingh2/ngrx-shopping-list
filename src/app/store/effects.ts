import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ActionTypes } from './actions';
import { FruitsService } from '../fruits.service';

@Injectable()
export class ShopEffects {
    constructor(
        private actions$: Actions,
        private fruitsService: FruitsService
    ) { }

    loadFruits$ = createEffect(() => this.actions$.pipe(
        ofType(ActionTypes.LoadItems),
        mergeMap(() =>
            this.fruitsService.getAll().pipe(
                map(fruits => {
                    return { type: ActionTypes.LoadSuccess, payload: (fruits as any).data };
                }),
                catchError(() => EMPTY)
            )
        )
    ));
}