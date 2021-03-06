/// <reference path="./lib.es.d.ts" />
/// <reference path="./es.d.ts" />
/// <reference path="./ui.d.ts" />
/// <reference path="./ae.constants.d.ts" />
/// <reference path="./ae.types.d.ts" />
/// <reference path="../jquery.d.ts" />

declare var alert:(message?, title?, errorIcon?) => void;
declare var confirm:(message?, noAsDefault?, title?) => boolean;
declare var prompt:(prompt?, defaultText?, title?) => string;
declare var localize:(string:string) => string;
declare var AECommandLineRenderer:() => void;
declare var garbageCollect:() => void;
declare var escape:(string:string) => string;
declare var app:Application;
declare var system:System;
/** CC 2015(13.6)- */
declare var generateRandomNumber:() => number;