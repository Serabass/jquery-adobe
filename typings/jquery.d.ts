declare type IteratorFn = (index:number, el:any) => any;
declare type JQuerySelector = string | number | Function | RegExp | Layer;
declare type JQueryCompSelector = string | number | Function | RegExp | CompItem;
declare type JQueryExpr = {[key:string]:Function};
declare class AfterEffectsTime {
}
declare type AETime = number | string | AfterEffectsTime | any | any[];

declare type PropAnimateOptions = {
    startTime:number,
    endTime:number,
    stepFn:Function,
    stepValue?:number
}