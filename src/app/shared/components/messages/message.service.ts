import { Injectable, signal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { map } from "rxjs";

@Injectable() //make it have multiple instances (non-singleton)
export class MessageService {

    private message = signal<string>('');
    _message = this.message.asReadonly();
    message$ = toObservable(this.message);

    isSuccessful!: boolean; //will determine the styling of the message

    showMessage$ = this.message$.pipe(
        map(message => !!message)
    )

    constructor() {}

    setMessage(message: string, isSuccessful: boolean) {
        this.message.set(message);
        this.isSuccessful = isSuccessful;
    }

}
