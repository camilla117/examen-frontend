import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, UrlSegment, RouterStateSnapshot, UrlTree, Router,  } from '@angular/router';
import { Observable } from 'rxjs';

export const authAdminGuard: CanActivateFn = (route, state) => {
    const routes: Router = new Router()
    const isAuthAdmin = localStorage.getItem("userLogged") == 'admin' ? true : false;
    if (isAuthAdmin) return true;
    else {
        routes.navigate([''])
        return false;
    }
}
