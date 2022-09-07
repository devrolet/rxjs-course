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

        // Use $ after the variable name if it is to become an observable. This does not 
        const interval$ = interval(1000);

        // An observable becomes a stream only after you subscribe to it.
        interval$.subscribe(val => console.log(`Stream 1 ${val}`));
        interval$.subscribe(val => console.log(`Stream 2 ${val}`));

    }


}






