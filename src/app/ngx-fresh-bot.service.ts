import { Injectable } from '@angular/core';
import { FBInitObject, FCUser } from './models';
import { Observable, Observer } from 'rxjs';
import { first, flatMap, switchMap } from 'rxjs/operators';

interface FCWidget {
    init: any;
    user: any;
    isOpen: any;
    open: any;
    close: any;
    track: any;
    setTags: any;
    setLocale: any;
    destroy: any;
    isInitialized: any;
    on: any;
}

@Injectable({
    providedIn: 'root'
})

export class NgxFreshBotService {
    loaded: boolean = false;

    constructor() { }


    /**
     * Initializes the Freshchat Widget.
     * @param data The Freshchat init object.
     * @returns An Observable which emits when the widget has loaded.
     * @author beyondsanity
     */
    init(data: FBInitObject): Observable<any> {
        return this.loadScript('https://cdn.in-freshbots.ai/assets/share/js/freshbots.min.js')
            .pipe(
                first(),
                switchMap(res => this.initWidget(data))
            );
    }



    private initWidget(data: FBInitObject): Observable<any> {

        return new Observable(observer => {
            /* this.getWidget().on('widget:loaded', (res: any) => {
                console.log('widget loaded');
                
                observer.next(res);
                observer.complete();
            }); */
           
            console.log(this.getWidget());
            
            this.getWidget().initiateWidget(
                { 
                    autoInitChat: false, 
                    getClientParams: function () { 
                        let name = data.firstName? data.firstName : '';
                        name += data.lastName? ' '+data.lastName:'';
                        console.log(name);
                        
                        return {
                            "sn::cstmr::id": data.restoreId,
                            "cstmr::eml": data.email,
                            "xtrnlTcktId": data.externalId,
                            "cstmr::lng": "english",
                            "sn::auth::id": "",
                            "cstmr::phn": data.phone,
                            "cstmr::nm": name
                        }; 
                    },
                    ...data.customFunctions 
                }, 
                function (successResponse:any) { console.log(successResponse);
                }, 
                function (errorResponse:any) { }
            ); 
            console.log(window);
            
            observer.complete();

        });
    }

    private resetConsumer(cb: any): Observable<any>{
        return new Observable((observer) => {
          this.getWidget().resetConsumer(cb);
          observer
        })
      }

    onUserCreate(): Observable<any> {
        return new Observable((observer) => {
          this.getWidget().on('user:created', (res:any) => {
            if (res.status !== 200) {
              observer.error(res.status);
            } else {
              observer.next(res.data || null);
            }
          });
        });
      }

    private getWidget(): any {
        return (window as any).Freshbots;
    }

    private loadScript(src: string): Observable<any> {
        return new Observable<any>((observer: Observer<any>) => {
            /* d.createElement('script'); 
            var loaded = false; 
            s.id = "spd-busns-spt"; 
            s.async = "async"; 
            s.setAttribute("data-self-init", "false"); 
            s.setAttribute("data-init-type", "opt"); 
            s.src = 'https://cdn.in-freshbots.ai/assets/share/js/freshbots.min.js'; 
            s.setAttribute("data-client", "b8af1f3876b4743f5be0c6596bdf1a05ff63998e"); 
            s.setAttribute("data-bot-hash", "797d08d07e440a38ee157ce4b4fc80c06e1e3daa"); 
            s.setAttribute("data-env", "prod"); s.setAttribute("data-region", "in") */
            var n:any = document.getElementsByTagName('script')[0];
            const scriptElement = document.createElement('script');
            scriptElement.type = 'text/javascript';
            scriptElement.id = 'spd-busns-spt';
            scriptElement.async = true;
            scriptElement.setAttribute("data-self-init", "false");
            scriptElement.setAttribute("data-init-type", "opt");
            scriptElement.src = src;
            scriptElement.setAttribute("data-client", "b8af1f3876b4743f5be0c6596bdf1a05ff63998e");
            scriptElement.setAttribute("data-bot-hash", "797d08d07e440a38ee157ce4b4fc80c06e1e3daa");
            scriptElement.setAttribute("data-env", "prod");
            scriptElement.setAttribute("data-region", "in");
            scriptElement.onload  =  () => {
                this.loaded = true;
                observer.next(src);
                console.log('script loaded');
                observer.complete();
            };
            scriptElement.onerror = () => observer.error('Couldn\'t load ' + src);
            document.getElementsByTagName('body')[0].appendChild(scriptElement);
            //n.parentNode.insertBefore(scriptElement, n); 
        });
    }

    /* function(d, w, c) { 
        if (!d.getElementById("spd-busns-spt")) { 
            var n = d.getElementsByTagName('script')[0], s = d.createElement('script'); 
            var loaded = false; s.id = "spd-busns-spt"; 
            s.async = "async";
             s.setAttribute("data-self-init", "false"); 
             s.setAttribute("data-init-type", "opt"); 
             s.src = 'https://cdn.in-freshbots.ai/assets/share/js/freshbots.min.js'; 
             s.setAttribute("data-client", "b8af1f3876b4743f5be0c6596bdf1a05ff63998e"); 
             s.setAttribute("data-bot-hash", "797d08d07e440a38ee157ce4b4fc80c06e1e3daa"); 
             s.setAttribute("data-env", "prod"); s.setAttribute("data-region", "in"); 
             if (c) { 
                 s.onreadystatechange = s.onload = function () { 
                     if (!loaded) { c(); 
                    } 
                    loaded = true; 
                }; 
            } 
            n.parentNode.insertBefore(s, n); 
        } })
        
        (document, window, function () { 
            Freshbots.initiateWidget({ 
                autoInitChat: false, 
                getClientParams: function () { return; } }, 
                function (successResponse) { }, 
                function (errorResponse) { }
                ); 
            }); */
}