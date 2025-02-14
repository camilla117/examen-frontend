import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, UrlSegment, RouterStateSnapshot, UrlTree, Router,  } from '@angular/router';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
    const routes: Router = new Router()
    const isAuth = localStorage.getItem("userLogged");
    if (isAuth !== null && isAuth != 'admin') return true;
    else {
        routes.navigate([''])
        return false;
    }
}
