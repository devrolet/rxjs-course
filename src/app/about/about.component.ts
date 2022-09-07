import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
    concat,
    fromEvent,
    interval,
    noop,
    observable,
    Observable,
    of,
    timer,
    merge,
    Subject,
    BehaviorSubject,
    AsyncSubject,
    ReplaySubject
} from 'rxjs';
import {delayWhen, filter, map, take, timeout} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';


@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    ngOnInit() {

        // Use $ after the variable name if it is to become an observable.
        // Use timer to wait an initial amount of time then start emitting values
        const interval$ = timer(3000, 1000);

        // An observable becomes a stream only after you subscribe to it.
        interval$.subscribe(val => console.log(`Stream 1 ${val}`));
        

        const click$ = fromEvent(document, 'click');

        click$.subscribe(evt => console.log(evt));

    }


}






