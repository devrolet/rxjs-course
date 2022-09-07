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

        // Build own HTTP observable

        

        const http$  = Observable.create(observer => {
            // Fetch method with data endpoint
            fetch('/api/courses')
                .then(response => {
                    return response.json();
                })
                .then(body => {
                    // emits values
                    observer.next(body);
                    // completes observable
                    observer.complete();
                })
                .catch(err => {
                    // catches error if found
                    observer.error(err);
                }) ;
        });

        http$.subscribe(
            courses => console.log(courses),
            noop,
            () => console.log("completed")
        )



    }


}






