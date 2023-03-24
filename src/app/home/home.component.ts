import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';
import {Store} from '../common/store.service';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;


    ngOnInit() {

        const http$ : Observable<Course[]> = 
            createHttpObservable('/api/courses');

        const courses$ = http$
            .pipe(
                tap(() => console.log("HTTP Request Executed")),
                map(res => Object.values(res["payload"])),
                shareReplay(),
                catchError(err => {
                    // Error Handling Strategy: Catch & Rethrow
                    console.log(`Error Occurred: ${err}`);
                    return throwError(err);
                })
            );

        this.beginnerCourses$ = courses$
            .pipe(
                map((courses: Course[]) => courses
                    .filter(course => course.category == 'BEGINNER'))
            );

        this.advancedCourses$ = courses$
            .pipe(
                map((courses: Course[]) => courses
                    .filter(course => course.category == 'ADVANCED'))
            );

    }

}
