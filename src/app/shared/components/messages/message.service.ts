import { Injectable, signal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'

})
export class MessageService {

    private message = signal<string>('');
    _message = this.message.asReadonly();
    message$ = toObservable(this.message);

    showMessage$ = this.message$.pipe(
        map(message => !!message)
    )

    constructor() {}

    setMessage(message: string) {
        this.message.set(message);
    }

}
