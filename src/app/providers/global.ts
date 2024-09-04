import { APP_INITIALIZER, ErrorHandler, NgZone, Provider, ValueProvider } from "@angular/core";
import { getWebInstrumentations, initializeFaro, MetaSession, ViewInstrumentation, WebVitalsInstrumentation } from "@grafana/faro-web-sdk";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";
import { api, API_ENDPOINT } from "../api/api";
import { GlobalErrorHandler } from "../shared/error/global.handler";

export function provideApiEndpoint(): ValueProvider {
    return {
        provide: API_ENDPOINT,
        useValue: api,
    }
}


export function provideObservability(): Provider[] {
    return [{
        provide: APP_INITIALIZER,
        useFactory: (zone: NgZone) => {
            return function () {
                zone.runOutsideAngular(() => {
                    initializeFaro({
                        url: 'http://localhost:3333/collect',
                        app: {
                            name: 'Product App',
                            version: '1.0',
                        },
                        sessionTracking: {
                            enabled: true,
                            persistent: true,
                            maxSessionPersistenceTime: 1 * 60 * 2000,
                            onSessionChange: (oldSession: MetaSession | null, newSession: MetaSession) => {
                                console.log(`Session ${oldSession == null ? 'created' : 'changed'}`, { oldSession, newSession })
                            },
                        },
                        instrumentations: [
                            ...getWebInstrumentations({
                                captureConsole: false,
                            }),
                            new WebVitalsInstrumentation(),
                            new TracingInstrumentation(),
                            new ViewInstrumentation(),
                        ]
                    })
                });
            }
        },
        multi: true,
        deps: [NgZone]
    },
    {
        provide: ErrorHandler,
        useClass: GlobalErrorHandler
    }
    ]
}