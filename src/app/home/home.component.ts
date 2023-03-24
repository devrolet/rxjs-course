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
                // Error Handling Strategy: Catch & Replace
                catchError(err => of([
                    {
                        id: 0,
                        description: "RxJs In Practice Course",
                        iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/rxjs-in-practice-course.png',
                        courseListIcon: 'https://angular-academy.s3.amazonaws.com/main-logo/main-page-logo-small-hat.png',
                        longDescription: "Understand the RxJs Observable pattern, learn the RxJs Operators via practical examples",
                        category: 'BEGINNER',
                        lessonsCount: 10
                    }
                ]))
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
