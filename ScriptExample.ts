/**
 * Selectors that I want to see:
 * :shy+locked
 * :motionBlur, Solid 1
 * :solo+!enabled
 */


declare type JQuerySelector = string | number | Function | RegExp;
declare type IteratorFn = (index:number) => any;

class JQuery<T> {
[index:number]:T;
    public length:number = 0;

    constructor(public init:Function) {

    }

    public first():T {
        return this[0];
    }

    public last():T {
        return this[this.length - 1];
    }

    public push(layer:T):JQuery<T> {
        this[this.length++] = layer;
        return this;
    }

    public each(fn:IteratorFn):JQuery<T> {
        for (var i = 0; i < this.length; i++) {
            fn.call(this[i], i);
        }

        return this;
    }

    public map(fn:IteratorFn):JQuery<T> {
        for (var i = 0; i < this.length; i++) {
            this[i] = fn.call(this[i], i);
        }

        return this;
    }

    public expr:{[key:string]:Function} = {
        shy: (layer:Layer) => layer.shy,
        solo: (layer:Layer) => layer.solo,
        locked: (layer:Layer) => layer.locked,
        enabled: (layer:Layer) => layer.enabled,
        motionBlur: (layer:Layer) => layer.motionBlur,
        text: (layer:Layer) => layer instanceof TextLayer,
        av: (layer:Layer) => layer instanceof AVLayer,
    };
}

class AEQuery extends JQuery<Layer> {

    public compare(layer:Layer, selector:JQuerySelector) {
        switch (typeof selector) {
            case 'string':
                if (selector[0] === ':') {
                    let name = (<string>selector).substr(1);
                    let names = name.split('+');
                    let result = names.map(name => {
                        var [match, negate1, fnName] = name.match(/(!)?(\w+)/);
                        var negate = negate1 === '!';
                        var fn:Function = this.expr[fnName];
                        var result;
                        if (!name)
                            throw `Expr function with name ${name} not found!`;

                        result = fn(layer);

                        return negate ? !result : result;
                    });

                    for (var i = 0; i < result.length; i++) {
                        if (result[i] !== true)
                            return false;
                    }

                    return true;
                }

                return layer.name === selector;

            case 'number':
                return layer.index === selector;

            case 'undefined':
                return true;

            case 'function':
                return (<Function>selector).call(layer);

            case 'object':
                if (selector instanceof RegExp)
                    return (<RegExp>selector).test(layer.name);
        }

        throw 12313123123123;
    }

    constructor(comp:CompItem = <CompItem>app.project.activeItem) {
        super((selector:JQuerySelector) => {
            var layers = comp.layers;
            for (var i = 1; i <= layers.length; i++) {
                var layer:Layer = layers[i];
                if (this.compare(layer, selector)) {
                    this.push(layer);
                }
            }

            return this;
        });
    }

    /**
     * path === 'Transorm > Position'
     * @param path
     * @param strict
     */
    public prop(path:string, strict:boolean = false) {

    }
}

(() => {
    var ae:AEQuery = new AEQuery();

    var s = ae.init(':text+enabled');
    alert(s.length);
})();