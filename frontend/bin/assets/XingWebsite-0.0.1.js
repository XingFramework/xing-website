System.registerModule("../../node_modules/a1atscript/src/a1atscript/AnnotationFinder.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/a1atscript/src/a1atscript/AnnotationFinder.js";
  var AnnotationFinder = function AnnotationFinder(AnnotatedClass) {
    this.AnnotatedClass = AnnotatedClass;
  };
  ($traceurRuntime.createClass)(AnnotationFinder, {
    annotationFor: function(AnnotationClass) {
      var OriginalClass = AnnotationClass.originalClass || AnnotationClass;
      if (this.AnnotatedClass.annotations) {
        return this.AnnotatedClass.annotations.find((function(annotation) {
          return annotation instanceof OriginalClass;
        }));
      } else {
        return null;
      }
    },
    annotationsFor: function(AnnotationClass) {
      var OriginalClass = AnnotationClass.originalClass || AnnotationClass;
      if (this.AnnotatedClass.annotations) {
        return this.AnnotatedClass.annotations.filter((function(annotation) {
          return annotation instanceof OriginalClass;
        }));
      } else {
        return null;
      }
    }
  }, {});
  return {get AnnotationFinder() {
      return AnnotationFinder;
    }};
});
System.registerModule("../../node_modules/a1atscript/src/a1atscript/ToAnnotation.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/a1atscript/src/a1atscript/ToAnnotation.js";
  function defineAnnotation(target, AnnotationClass, callParams) {
    var oldAnnotation = Object.getOwnPropertyDescriptor(target, 'annotations');
    if (oldAnnotation) {
      var oldGetter = oldAnnotation.get;
      Object.defineProperty(target, 'annotations', {
        configurable: true,
        get: function() {
          var oldValue = oldGetter();
          oldValue.unshift(new (Function.prototype.bind.apply(AnnotationClass, callParams)));
          return oldValue;
        }
      });
    } else {
      Object.defineProperty(target, 'annotations', {
        configurable: true,
        get: function() {
          return [new (Function.prototype.bind.apply(AnnotationClass, callParams))];
        }
      });
    }
  }
  function handleProperty(descriptor, AnnotationClass, callParams) {
    var value;
    if (descriptor.initializer) {
      value = descriptor.initializer();
    } else {
      value = descriptor.value;
    }
    defineAnnotation(value, AnnotationClass, callParams);
    if (descriptor.initializer) {
      descriptor.initializer = function() {
        return value;
      };
    }
    descriptor.enumerable = true;
    return descriptor;
  }
  function ToAnnotation(AnnotationClass) {
    var decorator = function() {
      for (var callParams = [],
          $__0 = 0; $__0 < arguments.length; $__0++)
        callParams[$__0] = arguments[$__0];
      callParams.unshift(null);
      return function(targetClass) {
        for (var otherParams = [],
            $__1 = 1; $__1 < arguments.length; $__1++)
          otherParams[$__1 - 1] = arguments[$__1];
        if (otherParams.length >= 2) {
          return handleProperty(otherParams[1], AnnotationClass, callParams);
        } else {
          defineAnnotation(targetClass, AnnotationClass, callParams);
          return targetClass;
        }
      };
    };
    decorator.originalClass = AnnotationClass;
    return decorator;
  }
  return {get ToAnnotation() {
      return ToAnnotation;
    }};
});
System.registerModule("../../node_modules/a1atscript/src/a1atscript/annotations.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/a1atscript/src/a1atscript/annotations.js";
  var ToAnnotation = System.get("../../node_modules/a1atscript/src/a1atscript/ToAnnotation.js").ToAnnotation;
  var NgAnnotation = function NgAnnotation() {
    for (var dependencies = [],
        $__2 = 0; $__2 < arguments.length; $__2++)
      dependencies[$__2] = arguments[$__2];
    this.dependencies = dependencies;
  };
  ($traceurRuntime.createClass)(NgAnnotation, {}, {});
  var NgNamedAnnotation = function NgNamedAnnotation(token) {
    var dependencies = arguments[1] !== (void 0) ? arguments[1] : [];
    this.dependencies = dependencies;
    this.token = token;
  };
  ($traceurRuntime.createClass)(NgNamedAnnotation, {}, {});
  var Config = function Config() {
    $traceurRuntime.superConstructor($Config).apply(this, arguments);
    ;
  };
  var $Config = Config;
  ($traceurRuntime.createClass)(Config, {}, {}, NgAnnotation);
  Object.defineProperty(Config, "annotations", {get: function() {
      return [new ToAnnotation];
    }});
  var Run = function Run() {
    $traceurRuntime.superConstructor($Run).apply(this, arguments);
    ;
  };
  var $Run = Run;
  ($traceurRuntime.createClass)(Run, {}, {}, NgAnnotation);
  Object.defineProperty(Run, "annotations", {get: function() {
      return [new ToAnnotation];
    }});
  var Controller = function Controller() {
    $traceurRuntime.superConstructor($Controller).apply(this, arguments);
    ;
  };
  var $Controller = Controller;
  ($traceurRuntime.createClass)(Controller, {}, {}, NgNamedAnnotation);
  Object.defineProperty(Controller, "annotations", {get: function() {
      return [new ToAnnotation];
    }});
  var Directive = function Directive() {
    $traceurRuntime.superConstructor($Directive).apply(this, arguments);
    ;
  };
  var $Directive = Directive;
  ($traceurRuntime.createClass)(Directive, {}, {}, NgNamedAnnotation);
  Object.defineProperty(Directive, "annotations", {get: function() {
      return [new ToAnnotation];
    }});
  var Service = function Service() {
    $traceurRuntime.superConstructor($Service).apply(this, arguments);
    ;
  };
  var $Service = Service;
  ($traceurRuntime.createClass)(Service, {}, {}, NgNamedAnnotation);
  Object.defineProperty(Service, "annotations", {get: function() {
      return [new ToAnnotation];
    }});
  var Factory = function Factory() {
    $traceurRuntime.superConstructor($Factory).apply(this, arguments);
    ;
  };
  var $Factory = Factory;
  ($traceurRuntime.createClass)(Factory, {}, {}, NgNamedAnnotation);
  Object.defineProperty(Factory, "annotations", {get: function() {
      return [new ToAnnotation];
    }});
  var Provider = function Provider() {
    $traceurRuntime.superConstructor($Provider).apply(this, arguments);
    ;
  };
  var $Provider = Provider;
  ($traceurRuntime.createClass)(Provider, {}, {}, NgNamedAnnotation);
  Object.defineProperty(Provider, "annotations", {get: function() {
      return [new ToAnnotation];
    }});
  var Value = function Value() {
    $traceurRuntime.superConstructor($Value).apply(this, arguments);
    ;
  };
  var $Value = Value;
  ($traceurRuntime.createClass)(Value, {}, {}, NgNamedAnnotation);
  Object.defineProperty(Value, "annotations", {get: function() {
      return [new ToAnnotation];
    }});
  var Constant = function Constant() {
    $traceurRuntime.superConstructor($Constant).apply(this, arguments);
    ;
  };
  var $Constant = Constant;
  ($traceurRuntime.createClass)(Constant, {}, {}, NgNamedAnnotation);
  Object.defineProperty(Constant, "annotations", {get: function() {
      return [new ToAnnotation];
    }});
  var Filter = function Filter() {
    $traceurRuntime.superConstructor($Filter).apply(this, arguments);
    ;
  };
  var $Filter = Filter;
  ($traceurRuntime.createClass)(Filter, {}, {}, NgNamedAnnotation);
  Object.defineProperty(Filter, "annotations", {get: function() {
      return [new ToAnnotation];
    }});
  var Animation = function Animation() {
    $traceurRuntime.superConstructor($Animation).apply(this, arguments);
    ;
  };
  var $Animation = Animation;
  ($traceurRuntime.createClass)(Animation, {}, {}, NgNamedAnnotation);
  Object.defineProperty(Animation, "annotations", {get: function() {
      return [new ToAnnotation];
    }});
  var Module = function Module() {
    $traceurRuntime.superConstructor($Module).apply(this, arguments);
    ;
  };
  var $Module = Module;
  ($traceurRuntime.createClass)(Module, {}, {}, NgNamedAnnotation);
  var AsModule = function AsModule() {
    $traceurRuntime.superConstructor($AsModule).apply(this, arguments);
    ;
  };
  var $AsModule = AsModule;
  ($traceurRuntime.createClass)(AsModule, {}, {}, Module);
  Object.defineProperty(AsModule, "annotations", {get: function() {
      return [new ToAnnotation];
    }});
  return {
    get Config() {
      return Config;
    },
    get Run() {
      return Run;
    },
    get Controller() {
      return Controller;
    },
    get Directive() {
      return Directive;
    },
    get Service() {
      return Service;
    },
    get Factory() {
      return Factory;
    },
    get Provider() {
      return Provider;
    },
    get Value() {
      return Value;
    },
    get Constant() {
      return Constant;
    },
    get Filter() {
      return Filter;
    },
    get Animation() {
      return Animation;
    },
    get Module() {
      return Module;
    },
    get AsModule() {
      return AsModule;
    }
  };
});
System.registerModule("../../node_modules/a1atscript/src/a1atscript/ng2Directives/Ng2Directive.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/a1atscript/src/a1atscript/ng2Directives/Ng2Directive.js";
  var Ng2Directive = function Ng2Directive(descriptor) {
    this.selector = descriptor.selector;
    this.properties = descriptor.properties || descriptor.bind;
    this.controllerAs = descriptor.controllerAs;
    this.require = descriptor.require;
    this.transclude = descriptor.transclude;
    this.events = descriptor.events;
  };
  ($traceurRuntime.createClass)(Ng2Directive, {}, {});
  var $__default = Ng2Directive;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../node_modules/a1atscript/src/a1atscript/ng2Directives/Component.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/a1atscript/src/a1atscript/ng2Directives/Component.js";
  var Ng2Directive = System.get("../../node_modules/a1atscript/src/a1atscript/ng2Directives/Ng2Directive.js").default;
  var ToAnnotation = System.get("../../node_modules/a1atscript/src/a1atscript/ToAnnotation.js").ToAnnotation;
  var Component = function Component(descriptor) {
    $traceurRuntime.superConstructor($Component).call(this, descriptor);
    this.appInjector = descriptor.appInjector || descriptor.injectables || descriptor.services;
  };
  var $Component = Component;
  ($traceurRuntime.createClass)(Component, {}, {}, Ng2Directive);
  Object.defineProperty(Component, "annotations", {get: function() {
      return [new ToAnnotation];
    }});
  var ViewBase = function ViewBase(descriptor) {
    this.templateUrl = descriptor.templateUrl || descriptor.url;
    this.template = descriptor.template || descriptor.inline;
  };
  ($traceurRuntime.createClass)(ViewBase, {}, {});
  var Template = function Template() {
    $traceurRuntime.superConstructor($Template).apply(this, arguments);
    ;
  };
  var $Template = Template;
  ($traceurRuntime.createClass)(Template, {}, {}, ViewBase);
  Object.defineProperty(Template, "annotations", {get: function() {
      return [new ToAnnotation];
    }});
  var View = function View() {
    $traceurRuntime.superConstructor($View).apply(this, arguments);
    ;
  };
  var $View = View;
  ($traceurRuntime.createClass)(View, {}, {}, ViewBase);
  Object.defineProperty(View, "annotations", {get: function() {
      return [new ToAnnotation];
    }});
  return {
    get Component() {
      return Component;
    },
    get ViewBase() {
      return ViewBase;
    },
    get Template() {
      return Template;
    },
    get View() {
      return View;
    }
  };
});
System.registerModule("../../node_modules/a1atscript/src/a1atscript/ng2Directives/SelectorMatcher.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/a1atscript/src/a1atscript/ng2Directives/SelectorMatcher.js";
  var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
  var MOZ_HACK_REGEXP = /^moz([A-Z])/;
  var SelectorMatcher = function SelectorMatcher(selector) {
    this._selector = selector;
  };
  ($traceurRuntime.createClass)(SelectorMatcher, {
    _camelizeName: function() {
      this._name = this._name.replace(SPECIAL_CHARS_REGEXP, (function(_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
      })).replace(MOZ_HACK_REGEXP, 'Moz$1');
    },
    _split: function() {
      if (this._selector[0] == ".") {
        this._restrict = "C";
        this._name = this._selector.substring(1);
      } else if (this._selector[0] == "[" && this._selector[this._selector.length - 1] == "]") {
        this._restrict = "A";
        this._name = this._selector.substring(1, this._selector.length - 1);
      } else {
        this._restrict = "E";
        this._name = this._selector;
      }
    },
    get name() {
      if (!this._name) {
        this._split();
      }
      this._camelizeName();
      return this._name;
    },
    get restrict() {
      if (!this._restrict) {
        this._split();
      }
      return this._restrict;
    }
  }, {});
  var $__default = SelectorMatcher;
  Object.defineProperty(SelectorMatcher, "parameters", {get: function() {
      return [[$traceurRuntime.type.string]];
    }});
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../node_modules/a1atscript/src/a1atscript/router/ComponentMapper.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/a1atscript/src/a1atscript/router/ComponentMapper.js";
  var Controller = System.get("../../node_modules/a1atscript/src/a1atscript/annotations.js").Controller;
  var $__1 = System.get("../../node_modules/a1atscript/src/a1atscript/ng2Directives/Component.js"),
      Component = $__1.Component,
      ViewBase = $__1.ViewBase;
  var AnnotationFinder = System.get("../../node_modules/a1atscript/src/a1atscript/AnnotationFinder.js").AnnotationFinder;
  var SelectorMatcher = System.get("../../node_modules/a1atscript/src/a1atscript/ng2Directives/SelectorMatcher.js").default;
  var DEFAULT_CONTROLLER_SUFFIX = "Controller";
  var DEFAULT_COMPONENT_PREFIX = "a1atscript";
  var DEFAULT_CONTROLLER_PREFIX = "A1AtScript";
  var ComponentMapping = function ComponentMapping(component, componentMapper) {
    this.component = component;
    this.componentMapper = componentMapper;
  };
  ($traceurRuntime.createClass)(ComponentMapping, {
    get componentName() {
      return this.componentMapper.map.get(this.component);
    },
    get templateUrl() {
      return this.componentMapper.registry[this.componentName].templateUrl;
    },
    get isController() {
      return this.componentMapper.registry[this.componentName].isController;
    },
    get controllerName() {
      return this.componentMapper.registry[this.componentName].controllerName;
    }
  }, {});
  var ComponentMapper = function ComponentMapper() {
    ;
  };
  ($traceurRuntime.createClass)(ComponentMapper, {
    register: function(component) {
      if (!this.map.get(component)) {
        this._setupComponent(component);
      }
      return new ComponentMapping(component, this);
    },
    _getControllerComponentName: function(component) {
      var name = this._getControllerName(component);
      if (name) {
        if (name.endsWith(DEFAULT_CONTROLLER_SUFFIX)) {
          return name[0].toLowerCase() + name.substr(1, name.length - DEFAULT_CONTROLLER_SUFFIX.length - 1);
        } else {
          return name[0].toLowerCase() + name.substr(1, name.length - 1);
        }
      } else {
        return null;
      }
    },
    _getControllerName: function(component) {
      var controllerAnnotation = (new AnnotationFinder(component)).annotationFor(Controller);
      if (controllerAnnotation) {
        return controllerAnnotation.token;
      } else {
        return null;
      }
    },
    _isController: function(component) {
      var controllerAnnotation = (new AnnotationFinder(component)).annotationFor(Controller);
      if (controllerAnnotation) {
        return true;
      } else {
        return false;
      }
    },
    _getComponentName: function(component) {
      var componentAnnotation = (new AnnotationFinder(component)).annotationFor(Component);
      if (componentAnnotation) {
        if (componentAnnotation.controllerAs) {
          return componentAnnotation.controllerAs;
        } else if (componentAnnotation.selector) {
          var selectorMatcher = new SelectorMatcher(componentAnnotation.selector);
          return selectorMatcher.name;
        } else {
          return null;
        }
      } else {
        return null;
      }
    },
    _getGeneratedName: function() {
      this._componentIndex = this._componentIndex || 0;
      var name = (DEFAULT_COMPONENT_PREFIX + "Component_" + this._componentIndex);
      this._componentIndex = this._componentIndex + 1;
      return name;
    },
    _generateName: function(component) {
      var name = this._getControllerComponentName(component);
      name = name || this._getComponentName(component);
      name = name || this._getGeneratedName();
      return name;
    },
    _generateTemplate: function(name, component) {
      var viewAnnotation = (new AnnotationFinder(component)).annotationFor(ViewBase);
      if (viewAnnotation && viewAnnotation.templateUrl) {
        return viewAnnotation.templateUrl;
      } else {
        return ("./components/" + name + "/" + name + ".html");
      }
    },
    _readInlineTemplate: function(templateUrl, component) {
      var viewAnnotation = (new AnnotationFinder(component)).annotationFor(ViewBase);
      if (viewAnnotation && viewAnnotation.template) {
        this.inlineTemplateCache[templateUrl] = viewAnnotation.template;
      }
    },
    _generateControllerName: function(name) {
      var componentBase;
      if (name.startsWith(DEFAULT_COMPONENT_PREFIX)) {
        componentBase = name.substring(DEFAULT_COMPONENT_PREFIX.length, name.length);
      } else {
        componentBase = name;
      }
      return DEFAULT_CONTROLLER_PREFIX + componentBase[0].toUpperCase() + componentBase.substring(1, componentBase.length) + DEFAULT_CONTROLLER_SUFFIX;
    },
    _setupComponent: function(component) {
      var name = this._generateName(component);
      var templateUrl = this._generateTemplate(name, component);
      var controllerName = this._getControllerName(component);
      var isController;
      if (controllerName) {
        isController = true;
      } else {
        isController = false;
        controllerName = this._generateControllerName(name);
      }
      this.map.set(component, name);
      this.registry[name] = {
        component: component,
        templateUrl: templateUrl,
        isController: isController,
        controllerName: controllerName
      };
      this.controllerRegistry[controllerName] = name;
      this._readInlineTemplate(templateUrl, component);
    },
    get registry() {
      this._componentRegistry = this._componentRegistry || {};
      return this._componentRegistry;
    },
    get map() {
      this._componentMap = this._componentMap || new Map();
      return this._componentMap;
    },
    getComponent: function(componentName) {
      return this.registry[componentName].component;
    },
    getTemplateUrl: function(componentName) {
      return this.registry[componentName].templateUrl;
    },
    getComponentName: function(component) {
      return this.map.get(component);
    },
    get controllerRegistry() {
      this._controllerRegistry = this._controllerRegistry || {};
      return this._controllerRegistry;
    },
    get inlineTemplateCache() {
      this._inlineTemplateCache = this._inlineTemplateCache || {};
      return this._inlineTemplateCache;
    }
  }, {});
  return {get ComponentMapper() {
      return ComponentMapper;
    }};
});
System.registerModule("../../node_modules/a1atscript/src/a1atscript/router/RouteConfig.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/a1atscript/src/a1atscript/router/RouteConfig.js";
  var ToAnnotation = System.get("../../node_modules/a1atscript/src/a1atscript/ToAnnotation.js").ToAnnotation;
  var RouteConfig = function RouteConfig(routeDescription) {
    this.routeDescription = routeDescription;
  };
  ($traceurRuntime.createClass)(RouteConfig, {}, {});
  Object.defineProperty(RouteConfig, "annotations", {get: function() {
      return [new ToAnnotation];
    }});
  return {get RouteConfig() {
      return RouteConfig;
    }};
});
System.registerModule("../../node_modules/a1atscript/src/a1atscript/router/RouteInitializer.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/a1atscript/src/a1atscript/router/RouteInitializer.js";
  var RouteInitializer = function RouteInitializer(componentMapper) {
    this.componentMapper = componentMapper;
  };
  ($traceurRuntime.createClass)(RouteInitializer, {
    configurationFunction: function(componentMapperName) {
      var componentMapper = this.componentMapper;
      return function($injector) {
        var $componentMapper;
        try {
          $componentMapper = $injector.get(componentMapperName);
        } catch (e) {
          return ;
        }
        $componentMapper.setCtrlNameMapping(function(name) {
          return componentMapper.registry[name].controllerName;
        });
        $componentMapper.setTemplateMapping(function(name) {
          return componentMapper.registry[name].templateUrl;
        });
        $componentMapper.setComponentFromCtrlMapping(function(controllerName) {
          return componentMapper.controllerRegistry[controllerName];
        });
      };
    },
    topRouteConfig: function(routerName, routeConfig) {
      return function($injector) {
        var $router;
        try {
          $router = $injector.get(routerName);
        } catch (e) {
          return ;
        }
        $router.config(routeConfig);
      };
    },
    setupComponentControllers: function() {
      var $__0 = this;
      Object.keys(this.componentMapper.registry).forEach((function(component) {
        var config = $__0.componentMapper.registry[component];
        if (!config.isController && config.component != $__0.topComponent) {
          $__0.module.controller(config.controllerName, config.component);
        }
      }));
    },
    setupInlineTemplates: function() {
      var inlineTemplateCache = this.componentMapper.inlineTemplateCache;
      return function($templateCache) {
        Object.keys(inlineTemplateCache).forEach((function(templateUrl) {
          $templateCache.put(templateUrl, inlineTemplateCache[templateUrl]);
        }));
      };
    },
    initialize: function(ngModuleName) {
      var topComponent = arguments[1] !== (void 0) ? arguments[1] : null;
      this.module = angular.module(ngModuleName);
      this.module.config(['$injector', this.configurationFunction('$componentLoaderProvider')]);
      this.module.run(['$injector', this.configurationFunction('$componentMapper')]);
      if (topComponent && topComponent.$routeConfig) {
        this.topComponent = topComponent;
        this.module.run(['$injector', this.topRouteConfig('$router', topComponent.$routeConfig)]);
      }
      this.setupComponentControllers();
      this.module.run(['$templateCache', this.setupInlineTemplates()]);
    }
  }, {});
  return {get RouteInitializer() {
      return RouteInitializer;
    }};
});
System.registerModule("../../node_modules/a1atscript/src/a1atscript/router/RouteReader.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/a1atscript/src/a1atscript/router/RouteReader.js";
  var RouteConfig = System.get("../../node_modules/a1atscript/src/a1atscript/router/RouteConfig.js").RouteConfig;
  var AnnotationFinder = System.get("../../node_modules/a1atscript/src/a1atscript/AnnotationFinder.js").AnnotationFinder;
  var RouteReader = function RouteReader(componentMapper) {
    this.componentMapper = componentMapper;
  };
  ($traceurRuntime.createClass)(RouteReader, {
    _routeConfigAnnotations: function(component) {
      return (new AnnotationFinder(component)).annotationsFor(RouteConfig);
    },
    _routeConfig: function(component) {
      return this._routeConfigAnnotations(component).map(this._convertConfig.bind(this));
    },
    _componentName: function(component) {
      if (typeof(component) === "string") {
        return component;
      } else {
        return this.componentMapper.register(component).componentName;
      }
    },
    _convertConfig: function(routeConfigAnnotation) {
      var $__2 = this;
      var routeDescription = Object.assign({}, routeConfigAnnotation.routeDescription);
      if (routeDescription.component) {
        routeDescription.component = this._componentName(routeDescription.component);
      }
      if (routeDescription.components) {
        var components = {};
        Object.keys(routeDescription.components).forEach((function(key) {
          components[key] = $__2._componentName(routeDescription.components[key]);
        }));
        routeDescription.components = components;
      }
      return routeDescription;
    },
    read: function(component) {
      var mapping = this.componentMapper.register(component);
      component.$routeConfig = this._routeConfig(component);
    }
  }, {});
  return {get RouteReader() {
      return RouteReader;
    }};
});
System.registerModule("../../node_modules/a1atscript/src/a1atscript/Router.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/a1atscript/src/a1atscript/Router.js";
  var ComponentMapper = System.get("../../node_modules/a1atscript/src/a1atscript/router/ComponentMapper.js").ComponentMapper;
  var RouteReader = System.get("../../node_modules/a1atscript/src/a1atscript/router/RouteReader.js").RouteReader;
  var RouteInitializer = System.get("../../node_modules/a1atscript/src/a1atscript/router/RouteInitializer.js").RouteInitializer;
  var $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_router_47_RouteConfig_46_js__ = System.get("../../node_modules/a1atscript/src/a1atscript/router/RouteConfig.js");
  var componentMapper = new ComponentMapper();
  var routeReader = new RouteReader(componentMapper);
  var routeInitializer = new RouteInitializer(componentMapper);
  var Router = {
    componentMapper: componentMapper,
    routeReader: routeReader,
    routeInitializer: routeInitializer
  };
  return {
    get RouteConfig() {
      return $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_router_47_RouteConfig_46_js__.RouteConfig;
    },
    get Router() {
      return Router;
    }
  };
});
System.registerModule("../../node_modules/a1atscript/src/a1atscript/injectorTypes.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/a1atscript/src/a1atscript/injectorTypes.js";
  var $__0 = System.get("../../node_modules/a1atscript/src/a1atscript/annotations.js"),
      Config = $__0.Config,
      Run = $__0.Run,
      Controller = $__0.Controller,
      Directive = $__0.Directive,
      Service = $__0.Service,
      Factory = $__0.Factory,
      Provider = $__0.Provider,
      Value = $__0.Value,
      Constant = $__0.Constant,
      Animation = $__0.Animation,
      Filter = $__0.Filter;
  var Router = System.get("../../node_modules/a1atscript/src/a1atscript/Router.js").Router;
  var ListInjector = function ListInjector() {
    ;
  };
  ($traceurRuntime.createClass)(ListInjector, {instantiate: function(module, dependencyList) {
      var $__2 = this;
      dependencyList.forEach((function(dependencyObject) {
        $__2.instantiateOne(module, dependencyObject.dependency, dependencyObject.metadata);
      }));
    }}, {});
  var ConfigInjector = function ConfigInjector() {
    $traceurRuntime.superConstructor($ConfigInjector).apply(this, arguments);
    ;
  };
  var $ConfigInjector = ConfigInjector;
  ($traceurRuntime.createClass)(ConfigInjector, {
    get annotationClass() {
      return Config;
    },
    instantiateOne: function(module, config, metadata) {
      config['$inject'] = metadata.dependencies;
      module.config(config);
    }
  }, {}, ListInjector);
  var RunInjector = function RunInjector() {
    $traceurRuntime.superConstructor($RunInjector).apply(this, arguments);
    ;
  };
  var $RunInjector = RunInjector;
  ($traceurRuntime.createClass)(RunInjector, {
    get annotationClass() {
      return Run;
    },
    instantiateOne: function(module, run, metadata) {
      run['$inject'] = metadata.dependencies;
      module.run(run);
    }
  }, {}, ListInjector);
  var ControllerInjector = function ControllerInjector() {
    $traceurRuntime.superConstructor($ControllerInjector).apply(this, arguments);
    ;
  };
  var $ControllerInjector = ControllerInjector;
  ($traceurRuntime.createClass)(ControllerInjector, {
    get annotationClass() {
      return Controller;
    },
    instantiateOne: function(module, controller, metadata) {
      controller['$inject'] = metadata.dependencies;
      Router.routeReader.read(controller);
      module.controller(metadata.token, controller);
    }
  }, {}, ListInjector);
  var DirectiveInjector = function DirectiveInjector() {
    $traceurRuntime.superConstructor($DirectiveInjector).apply(this, arguments);
    ;
  };
  var $DirectiveInjector = DirectiveInjector;
  ($traceurRuntime.createClass)(DirectiveInjector, {
    get annotationClass() {
      return Directive;
    },
    instantiateOne: function(module, directive, metadata) {
      directive['$inject'] = metadata.dependencies;
      module.directive(metadata.token, directive);
    }
  }, {}, ListInjector);
  var ServiceInjector = function ServiceInjector() {
    $traceurRuntime.superConstructor($ServiceInjector).apply(this, arguments);
    ;
  };
  var $ServiceInjector = ServiceInjector;
  ($traceurRuntime.createClass)(ServiceInjector, {
    get annotationClass() {
      return Service;
    },
    instantiateOne: function(module, service, metadata) {
      service['$inject'] = metadata.dependencies;
      module.service(metadata.token, service);
    }
  }, {}, ListInjector);
  var FactoryInjector = function FactoryInjector() {
    $traceurRuntime.superConstructor($FactoryInjector).apply(this, arguments);
    ;
  };
  var $FactoryInjector = FactoryInjector;
  ($traceurRuntime.createClass)(FactoryInjector, {
    get annotationClass() {
      return Factory;
    },
    instantiateOne: function(module, factory, metadata) {
      factory['$inject'] = metadata.dependencies;
      module.factory(metadata.token, factory);
    }
  }, {}, ListInjector);
  var ProviderInjector = function ProviderInjector() {
    $traceurRuntime.superConstructor($ProviderInjector).apply(this, arguments);
    ;
  };
  var $ProviderInjector = ProviderInjector;
  ($traceurRuntime.createClass)(ProviderInjector, {
    get annotationClass() {
      return Provider;
    },
    instantiateOne: function(module, provider, metadata) {
      provider['$inject'] = metadata.dependencies;
      module.provider(metadata.token, provider);
    }
  }, {}, ListInjector);
  var ValueInjector = function ValueInjector() {
    $traceurRuntime.superConstructor($ValueInjector).apply(this, arguments);
    ;
  };
  var $ValueInjector = ValueInjector;
  ($traceurRuntime.createClass)(ValueInjector, {
    get annotationClass() {
      return Value;
    },
    instantiateOne: function(module, value, metadata) {
      value['$inject'] = metadata.dependencies;
      module.value(metadata.token, value);
    }
  }, {}, ListInjector);
  var ConstantInjector = function ConstantInjector() {
    $traceurRuntime.superConstructor($ConstantInjector).apply(this, arguments);
    ;
  };
  var $ConstantInjector = ConstantInjector;
  ($traceurRuntime.createClass)(ConstantInjector, {
    get annotationClass() {
      return Constant;
    },
    instantiateOne: function(module, constant, metadata) {
      constant['$inject'] = metadata.dependencies;
      module.constant(metadata.token, constant);
    }
  }, {}, ListInjector);
  var AnimationInjector = function AnimationInjector() {
    $traceurRuntime.superConstructor($AnimationInjector).apply(this, arguments);
    ;
  };
  var $AnimationInjector = AnimationInjector;
  ($traceurRuntime.createClass)(AnimationInjector, {
    get annotationClass() {
      return Animation;
    },
    instantiateOne: function(module, animation, metadata) {
      animation['$inject'] = metadata.dependencies;
      module.animation(metadata.token, animation);
    }
  }, {}, ListInjector);
  var FilterInjector = function FilterInjector() {
    $traceurRuntime.superConstructor($FilterInjector).apply(this, arguments);
    ;
  };
  var $FilterInjector = FilterInjector;
  ($traceurRuntime.createClass)(FilterInjector, {
    get annotationClass() {
      return Filter;
    },
    instantiateOne: function(module, filter, metadata) {
      filter['$inject'] = metadata.dependencies;
      module.filter(metadata.token, filter);
    }
  }, {}, ListInjector);
  return {
    get ListInjector() {
      return ListInjector;
    },
    get ConfigInjector() {
      return ConfigInjector;
    },
    get RunInjector() {
      return RunInjector;
    },
    get ControllerInjector() {
      return ControllerInjector;
    },
    get DirectiveInjector() {
      return DirectiveInjector;
    },
    get ServiceInjector() {
      return ServiceInjector;
    },
    get FactoryInjector() {
      return FactoryInjector;
    },
    get ProviderInjector() {
      return ProviderInjector;
    },
    get ValueInjector() {
      return ValueInjector;
    },
    get ConstantInjector() {
      return ConstantInjector;
    },
    get AnimationInjector() {
      return AnimationInjector;
    },
    get FilterInjector() {
      return FilterInjector;
    }
  };
});
System.registerModule("../../node_modules/a1atscript/src/a1atscript/Injector.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/a1atscript/src/a1atscript/Injector.js";
  var $__0 = System.get("../../node_modules/a1atscript/src/a1atscript/annotations.js"),
      AsModule = $__0.AsModule,
      Module = $__0.Module;
  var AnnotationFinder = System.get("../../node_modules/a1atscript/src/a1atscript/AnnotationFinder.js").AnnotationFinder;
  var $__2 = System.get("../../node_modules/a1atscript/src/a1atscript/injectorTypes.js"),
      ConfigInjector = $__2.ConfigInjector,
      RunInjector = $__2.RunInjector,
      ControllerInjector = $__2.ControllerInjector,
      DirectiveInjector = $__2.DirectiveInjector,
      ServiceInjector = $__2.ServiceInjector,
      FactoryInjector = $__2.FactoryInjector,
      ProviderInjector = $__2.ProviderInjector,
      ValueInjector = $__2.ValueInjector,
      ConstantInjector = $__2.ConstantInjector,
      AnimationInjector = $__2.AnimationInjector,
      FilterInjector = $__2.FilterInjector;
  var registeredInjectors = {};
  function registerInjector(name, InjectorClass) {
    registeredInjectors[name] = new InjectorClass();
  }
  function getInjector(name) {
    return registeredInjectors[name];
  }
  registerInjector('config', ConfigInjector);
  registerInjector('run', RunInjector);
  registerInjector('controller', ControllerInjector);
  registerInjector('directive', DirectiveInjector);
  registerInjector('service', ServiceInjector);
  registerInjector('factory', FactoryInjector);
  registerInjector('provider', ProviderInjector);
  registerInjector('value', ValueInjector);
  registerInjector('constant', ConstantInjector);
  registerInjector('animation', AnimationInjector);
  registerInjector('filter', FilterInjector);
  var Injector = function Injector() {
    var appNamePrefix = arguments[0] !== (void 0) ? arguments[0] : "";
    this.appNamePrefix = appNamePrefix;
    this.injectedModules = {};
  };
  ($traceurRuntime.createClass)(Injector, {
    get annotationClass() {
      return Module;
    },
    instantiate: function(moduleClass) {
      var metadata = this._getAnnotatedClass(moduleClass);
      if (!metadata) {
        return undefined;
      }
      if (this.injectedModules[metadata.token]) {
        return this.injectedModules[metadata.token];
      }
      var sortedDependencies = this._sortModuleDependencies(metadata);
      sortedDependencies = this._sortSelf(metadata, moduleClass, sortedDependencies);
      var moduleDependencies = this._instantiateModuleDependencies(sortedDependencies.module);
      var moduleName = metadata.token;
      if (this.appNamePrefix && moduleName != this.appNamePrefix) {
        moduleName = (this.appNamePrefix + "." + moduleName);
      }
      var instantiatedModule = angular.module(moduleName, moduleDependencies);
      delete sortedDependencies.module;
      this._instantiateOtherDependencies(sortedDependencies, instantiatedModule);
      this.injectedModules[metadata.token] = moduleName;
      return moduleName;
    },
    _sortSelf: function(metadata, moduleClass, sortedDependencies) {
      if (metadata == moduleClass) {
        return sortedDependencies;
      } else {
        var selfDependency = this._sortDependency(moduleClass, false);
        return this._mergeSortedDependencies(sortedDependencies, selfDependency);
      }
    },
    _getAnnotatedClass: function(moduleClass) {
      if (moduleClass instanceof Module) {
        moduleClass.injectable = false;
        return moduleClass;
      } else {
        var metadata = this._getModuleAnnotation(moduleClass);
        return metadata;
      }
    },
    _getDependencyType: function(dependency) {
      var annotations = dependency.annotations;
      for (var i = 0; i < annotations.length; i++) {
        var annotation = annotations[i];
        var foundInjector = Object.keys(registeredInjectors).find((function(key) {
          var annotationClass = registeredInjectors[key].annotationClass;
          annotationClass = annotationClass.originalClass || annotationClass;
          return annotation instanceof annotationClass;
        }));
        if (foundInjector) {
          return {
            key: foundInjector,
            metadata: annotation
          };
        }
      }
      return null;
    },
    _getModuleAnnotation: function(dependency) {
      return (new AnnotationFinder(dependency)).annotationFor(Module);
    },
    _mergeSortedDependencies: function(sorted1, sorted2) {
      var newSorted = {};
      Object.assign(newSorted, sorted1);
      Object.keys(sorted2).forEach((function(key) {
        if (newSorted[key]) {
          newSorted[key] = newSorted[key].concat(sorted2[key]);
        } else {
          newSorted[key] = sorted2[key];
        }
      }));
      return newSorted;
    },
    _sortDependency: function(dependency) {
      var checkModule = arguments[1] !== (void 0) ? arguments[1] : true;
      var $__3 = this;
      var sorted = {};
      if (typeof dependency === "string" || dependency instanceof Module) {
        sorted.module = [dependency];
      } else if (dependency.annotations) {
        if (checkModule && this._getModuleAnnotation(dependency)) {
          sorted.module = [dependency];
        } else {
          var dependencyType = this._getDependencyType(dependency);
          if (dependencyType) {
            sorted[dependencyType.key] = [{
              dependency: dependency,
              metadata: dependencyType.metadata
            }];
          }
        }
      } else {
        Object.keys(dependency).forEach((function(key) {
          var subDependency = dependency[key];
          var sortedSubDependencies = $__3._sortDependency(subDependency);
          sorted = $__3._mergeSortedDependencies(sorted, sortedSubDependencies);
        }));
      }
      return sorted;
    },
    _sortModuleDependencies: function(moduleClass) {
      var $__3 = this;
      var sorted = {};
      moduleClass.dependencies.forEach((function(dependency) {
        var newSortedDependencies = $__3._sortDependency(dependency);
        sorted = $__3._mergeSortedDependencies(sorted, newSortedDependencies);
      }));
      return sorted;
    },
    _moduleMetadata: function(moduleClass) {
      return moduleClass.annotations.find((function(value) {
        return value instanceof Module || value instanceof AsModule;
      }));
    },
    _instantiateModuleDependencies: function(moduleDependencies) {
      var $__3 = this;
      var returnedDependencies = [];
      if (moduleDependencies) {
        moduleDependencies.forEach((function(moduleDependency) {
          if (typeof moduleDependency === "string") {
            returnedDependencies.push(moduleDependency);
          } else {
            returnedDependencies.push($__3.instantiate(moduleDependency));
          }
        }));
      }
      return returnedDependencies;
    },
    _instantiateOtherDependencies: function(sortedDependencies, instantiatedModule) {
      Object.keys(sortedDependencies).forEach((function(dependencyType) {
        registeredInjectors[dependencyType].instantiate(instantiatedModule, sortedDependencies[dependencyType]);
      }));
    }
  }, {});
  return {
    get registerInjector() {
      return registerInjector;
    },
    get getInjector() {
      return getInjector;
    },
    get Injector() {
      return Injector;
    }
  };
});
System.registerModule("../../node_modules/a1atscript/src/a1atscript/DirectiveObject.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/a1atscript/src/a1atscript/DirectiveObject.js";
  var ListInjector = System.get("../../node_modules/a1atscript/src/a1atscript/injectorTypes.js").ListInjector;
  var registerInjector = System.get("../../node_modules/a1atscript/src/a1atscript/Injector.js").registerInjector;
  var ToAnnotation = System.get("../../node_modules/a1atscript/src/a1atscript/ToAnnotation.js").ToAnnotation;
  var DirectiveObject = function DirectiveObject(token) {
    var dependencies = arguments[1] !== (void 0) ? arguments[1] : [];
    this.dependencies = dependencies;
    this.token = token;
  };
  ($traceurRuntime.createClass)(DirectiveObject, {}, {});
  Object.defineProperty(DirectiveObject, "annotations", {get: function() {
      return [new ToAnnotation];
    }});
  var DirectiveObjectInjector = function DirectiveObjectInjector() {
    $traceurRuntime.superConstructor($DirectiveObjectInjector).apply(this, arguments);
    ;
  };
  var $DirectiveObjectInjector = DirectiveObjectInjector;
  ($traceurRuntime.createClass)(DirectiveObjectInjector, {
    get annotationClass() {
      return DirectiveObject;
    },
    _createFactoryArray: function(ConstructorFn) {
      var args = ConstructorFn.$inject || [];
      var factoryArray = args.slice();
      factoryArray.push((function() {
        for (var args = [],
            $__4 = 0; $__4 < arguments.length; $__4++)
          args[$__4] = arguments[$__4];
        var directive = new (Function.prototype.bind.apply(ConstructorFn, $traceurRuntime.spread([null], args)))();
        for (var key in directive) {
          directive[key] = directive[key];
        }
        return directive;
      }));
      return factoryArray;
    },
    _cloneFunction: function(original) {
      return function() {
        return original.apply(this, arguments);
      };
    },
    _override: function(object, methodName, callback) {
      object[methodName] = callback(object[methodName]);
    },
    instantiateOne: function(module, directiveObject, metadata) {
      directiveObject['$inject'] = metadata.dependencies;
      if (!directiveObject.prototype.compile) {
        directiveObject.prototype.compile = (function() {});
      }
      var originalCompileFn = this._cloneFunction(directiveObject.prototype.compile);
      this._override(directiveObject.prototype, 'compile', function() {
        return function() {
          originalCompileFn.apply(this, arguments);
          if (directiveObject.prototype.link) {
            return directiveObject.prototype.link.bind(this);
          }
        };
      });
      var factoryArray = this._createFactoryArray(directiveObject);
      module.directive(metadata.token, factoryArray);
    }
  }, {}, ListInjector);
  registerInjector('directiveObject', DirectiveObjectInjector);
  return {get DirectiveObject() {
      return DirectiveObject;
    }};
});
System.registerModule("../../node_modules/a1atscript/src/a1atscript/applyAnnotation.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/a1atscript/src/a1atscript/applyAnnotation.js";
  function applyAnnotation(target, annotationClass) {
    for (var params = [],
        $__0 = 2; $__0 < arguments.length; $__0++)
      params[$__0 - 2] = arguments[$__0];
    var AnnotationVersion = annotationClass.originalClass || annotationClass;
    target.annotations = target.annotations || [];
    target.annotations.push(new (Function.prototype.bind.apply(AnnotationVersion, $traceurRuntime.spread([null], params)))());
  }
  return {get applyAnnotation() {
      return applyAnnotation;
    }};
});
System.registerModule("../../node_modules/a1atscript/src/a1atscript/bootstrap.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/a1atscript/src/a1atscript/bootstrap.js";
  var Injector = System.get("../../node_modules/a1atscript/src/a1atscript/Injector.js").Injector;
  var Router = System.get("../../node_modules/a1atscript/src/a1atscript/Router.js").Router;
  function bootstrap(appModule) {
    var appPrefix = arguments[1] !== (void 0) ? arguments[1] : "";
    var injector = new Injector(appPrefix);
    var moduleName = injector.instantiate(appModule);
    Router.routeInitializer.initialize(moduleName, appModule);
  }
  return {get bootstrap() {
      return bootstrap;
    }};
});
System.registerModule("../../node_modules/a1atscript/src/a1atscript/ng2Directives/BindBuilder.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/a1atscript/src/a1atscript/ng2Directives/BindBuilder.js";
  var BindBuilder = function BindBuilder(bindParam, component) {
    this._bindParam = bindParam;
    this._component = component;
  };
  ($traceurRuntime.createClass)(BindBuilder, {
    get bindObj() {
      var $__0 = this;
      if (!this._bindObj) {
        if (Array.isArray(this._bindParam)) {
          this._bindObj = {};
          var splitBind;
          this._bindParam.forEach((function(bind) {
            splitBind = bind.split(/\s*:\s*/);
            if (splitBind.length == 1) {
              $__0._bindObj[bind] = bind;
            } else {
              $__0._bindObj[splitBind[0]] = splitBind[1];
            }
          }));
        } else {
          this._bindObj = this._bindParam;
        }
      }
      return this._bindObj;
    },
    build: function() {
      var $__0 = this;
      var properties = {};
      Object.keys(this.bindObj).forEach((function(key) {
        $__0.setupProperty(key, properties);
      }));
      return properties;
    }
  }, {});
  var $__default = BindBuilder;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../node_modules/a1atscript/src/a1atscript/ng2Directives/EventsBuilder.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/a1atscript/src/a1atscript/ng2Directives/EventsBuilder.js";
  var BindBuilder = System.get("../../node_modules/a1atscript/src/a1atscript/ng2Directives/BindBuilder.js").default;
  var prefix = "___bindable___";
  var EventsBuilder = function EventsBuilder() {
    $traceurRuntime.superConstructor($EventsBuilder).apply(this, arguments);
    ;
  };
  var $EventsBuilder = EventsBuilder;
  ($traceurRuntime.createClass)(EventsBuilder, {setupProperty: function(key, events) {
      events[key] = "=?on" + this.bindObj[key][0].toUpperCase() + this.bindObj[key].slice(1);
    }}, {}, BindBuilder);
  var $__default = EventsBuilder;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../node_modules/a1atscript/src/a1atscript/ng2Directives/Ng2DirectiveDefinitionObject.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/a1atscript/src/a1atscript/ng2Directives/Ng2DirectiveDefinitionObject.js";
  var SelectorMatcher = System.get("../../node_modules/a1atscript/src/a1atscript/ng2Directives/SelectorMatcher.js").default;
  var Ng2DirectiveDefinitionObject = function Ng2DirectiveDefinitionObject(controller, annotation) {
    var template = arguments[2] !== (void 0) ? arguments[2] : {};
    var bind = arguments[3] !== (void 0) ? arguments[3] : null;
    this._annotation = annotation;
    this._controller = controller;
    this._template = template;
    this._bind = bind;
  };
  ($traceurRuntime.createClass)(Ng2DirectiveDefinitionObject, {
    get selectorMatcher() {
      this._selectorMatcher = this._selectorMatcher || new SelectorMatcher(this._annotation.selector);
      return this._selectorMatcher;
    },
    get restrict() {
      return this.selectorMatcher.restrict;
    },
    get controllerAs() {
      return this._annotation.controllerAs || this.name;
    },
    get bindToController() {
      if (angular.version.major == 1 && angular.version.minor >= 4) {
        return this._bind || this._annotation.properties;
      } else {
        return true;
      }
    },
    get scope() {
      if (angular.version.major == 1 && angular.version.minor >= 4) {
        return {};
      } else {
        return this._bind || this._annotation.properties;
      }
    },
    get template() {
      return this._template.template;
    },
    get templateUrl() {
      return this._template.templateUrl;
    },
    get transclude() {
      return this._annotation.transclude;
    },
    get require() {
      return this._annotation.require;
    },
    get controller() {
      return this._controller;
    },
    get name() {
      return this.selectorMatcher.name;
    },
    get factoryFn() {
      var $__1 = this;
      return (function() {
        return {
          scope: $__1.scope,
          restrict: $__1.restrict,
          template: $__1.template,
          require: $__1.require,
          transclude: $__1.transclude,
          templateUrl: $__1.templateUrl,
          controller: $__1.controller,
          bindToController: $__1.bindToController,
          controllerAs: $__1.controllerAs
        };
      });
    }
  }, {});
  var $__default = Ng2DirectiveDefinitionObject;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../node_modules/a1atscript/src/a1atscript/ng2Directives/PropertiesBuilder.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/a1atscript/src/a1atscript/ng2Directives/PropertiesBuilder.js";
  var BindBuilder = System.get("../../node_modules/a1atscript/src/a1atscript/ng2Directives/BindBuilder.js").default;
  var BIND_PREFIX = "_=_";
  var STRING_PREFIX = "_@_";
  var BINDING = BIND_PREFIX;
  var RAW_STRING = STRING_PREFIX;
  var PropertiesBuilder = function PropertiesBuilder() {
    $traceurRuntime.superConstructor($PropertiesBuilder).apply(this, arguments);
    ;
  };
  var $PropertiesBuilder = PropertiesBuilder;
  ($traceurRuntime.createClass)(PropertiesBuilder, {setupProperty: function(key, properties) {
      properties[STRING_PREFIX + key] = "@" + this.bindObj[key];
      properties[BIND_PREFIX + key] = "=?bind" + this.bindObj[key][0].toUpperCase() + this.bindObj[key].slice(1);
      Object.defineProperty(this._component.prototype, BIND_PREFIX + key, {
        enumerable: true,
        configurable: true,
        set: genericSetter(BINDING, RAW_STRING),
        get: function() {
          return this[key];
        }
      });
      Object.defineProperty(this._component.prototype, STRING_PREFIX + key, {
        enumerable: true,
        configurable: true,
        set: genericSetter(RAW_STRING, BINDING),
        get: function() {
          return this[key];
        }
      });
      function genericSetter(use, errorOn) {
        return function(value) {
          this.__using_binding__ = this.__using_binding__ || {};
          if (this.__using_binding__[key] === errorOn) {
            if (value !== undefined) {
              throw new Error(("Cannot use bind-" + key + " and " + key + " simultaneously"));
            }
            return ;
          }
          if (value !== undefined) {
            this.__using_binding__[key] = use;
          }
          this[key] = value;
        };
      }
    }}, {}, BindBuilder);
  var $__default = PropertiesBuilder;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../node_modules/a1atscript/src/a1atscript/ng2Directives/ComponentInjector.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/a1atscript/src/a1atscript/ng2Directives/ComponentInjector.js";
  var registerInjector = System.get("../../node_modules/a1atscript/src/a1atscript/Injector.js").registerInjector;
  var $__1 = System.get("../../node_modules/a1atscript/src/a1atscript/ng2Directives/Component.js"),
      Component = $__1.Component,
      ViewBase = $__1.ViewBase;
  var ListInjector = System.get("../../node_modules/a1atscript/src/a1atscript/injectorTypes.js").ListInjector;
  var Ng2DirectiveDefinitionObject = System.get("../../node_modules/a1atscript/src/a1atscript/ng2Directives/Ng2DirectiveDefinitionObject.js").default;
  var PropertiesBuilder = System.get("../../node_modules/a1atscript/src/a1atscript/ng2Directives/PropertiesBuilder.js").default;
  var EventsBuilder = System.get("../../node_modules/a1atscript/src/a1atscript/ng2Directives/EventsBuilder.js").default;
  var Router = System.get("../../node_modules/a1atscript/src/a1atscript/Router.js").Router;
  var ComponentInjector = function ComponentInjector() {
    $traceurRuntime.superConstructor($ComponentInjector).call(this);
    this.componentHooks = {
      before: [],
      after: []
    };
  };
  var $ComponentInjector = ComponentInjector;
  ($traceurRuntime.createClass)(ComponentInjector, {
    get annotationClass() {
      return Component;
    },
    _template: function(component) {
      return component.annotations.find((function(annotation) {
        return annotation instanceof ViewBase;
      })) || {};
    },
    instantiateOne: function(module, component, annotation) {
      if (annotation.appInjector) {
        component.$inject = annotation.appInjector;
      }
      Router.routeReader.read(component);
      var template = this._template(component);
      var properties = {},
          events = {},
          bind;
      if (annotation.properties) {
        properties = (new PropertiesBuilder(annotation.properties, component)).build();
      }
      if (annotation.events) {
        events = (new EventsBuilder(annotation.events, component)).build();
      }
      bind = Object.assign({}, properties, events);
      if (bind === {})
        bind = null;
      if (annotation.selector) {
        var ddo = new Ng2DirectiveDefinitionObject(component, annotation, template, bind);
        this.hooks('before', module, ddo);
        module.directive(ddo.name, ddo.factoryFn);
        this.hooks('after', module, ddo);
      }
    },
    hooks: function(phase, module, ddo) {
      this.componentHooks[phase].forEach((function(hook) {
        hook(module, ddo);
      }));
    }
  }, {}, ListInjector);
  registerInjector('component', ComponentInjector);
  return {};
});
System.registerModule("../../node_modules/a1atscript/src/a1atscript.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/a1atscript/src/a1atscript.js";
  var $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_Injector_46_js__ = System.get("../../node_modules/a1atscript/src/a1atscript/Injector.js");
  var $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_annotations_46_js__ = System.get("../../node_modules/a1atscript/src/a1atscript/annotations.js");
  var $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_DirectiveObject_46_js__ = System.get("../../node_modules/a1atscript/src/a1atscript/DirectiveObject.js");
  System.get("../../node_modules/a1atscript/src/a1atscript/ng2Directives/ComponentInjector.js");
  var $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_ng2Directives_47_Component_46_js__ = System.get("../../node_modules/a1atscript/src/a1atscript/ng2Directives/Component.js");
  var $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_ToAnnotation_46_js__ = System.get("../../node_modules/a1atscript/src/a1atscript/ToAnnotation.js");
  var $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_bootstrap_46_js__ = System.get("../../node_modules/a1atscript/src/a1atscript/bootstrap.js");
  var $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_Router_46_js__ = System.get("../../node_modules/a1atscript/src/a1atscript/Router.js");
  var $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_applyAnnotation_46_js__ = System.get("../../node_modules/a1atscript/src/a1atscript/applyAnnotation.js");
  return {
    get registerInjector() {
      return $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_Injector_46_js__.registerInjector;
    },
    get getInjector() {
      return $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_Injector_46_js__.getInjector;
    },
    get Injector() {
      return $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_Injector_46_js__.Injector;
    },
    get Config() {
      return $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_annotations_46_js__.Config;
    },
    get Run() {
      return $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_annotations_46_js__.Run;
    },
    get Controller() {
      return $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_annotations_46_js__.Controller;
    },
    get Directive() {
      return $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_annotations_46_js__.Directive;
    },
    get Service() {
      return $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_annotations_46_js__.Service;
    },
    get Factory() {
      return $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_annotations_46_js__.Factory;
    },
    get Provider() {
      return $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_annotations_46_js__.Provider;
    },
    get Value() {
      return $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_annotations_46_js__.Value;
    },
    get Constant() {
      return $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_annotations_46_js__.Constant;
    },
    get Filter() {
      return $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_annotations_46_js__.Filter;
    },
    get Animation() {
      return $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_annotations_46_js__.Animation;
    },
    get Module() {
      return $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_annotations_46_js__.Module;
    },
    get AsModule() {
      return $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_annotations_46_js__.AsModule;
    },
    get DirectiveObject() {
      return $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_DirectiveObject_46_js__.DirectiveObject;
    },
    get Component() {
      return $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_ng2Directives_47_Component_46_js__.Component;
    },
    get Template() {
      return $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_ng2Directives_47_Component_46_js__.Template;
    },
    get View() {
      return $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_ng2Directives_47_Component_46_js__.View;
    },
    get ToAnnotation() {
      return $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_ToAnnotation_46_js__.ToAnnotation;
    },
    get bootstrap() {
      return $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_bootstrap_46_js__.bootstrap;
    },
    get Router() {
      return $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_Router_46_js__.Router;
    },
    get RouteConfig() {
      return $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_Router_46_js__.RouteConfig;
    },
    get applyAnnotation() {
      return $___46__46__47__46__46__47_node_95_modules_47_a1atscript_47_src_47_a1atscript_47_applyAnnotation_46_js__.applyAnnotation;
    }
  };
});
System.registerModule("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/app/exampleForm/exampleFormControllers.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/xing-frontend-utils/src/xing-frontend-utils/app/exampleForm/exampleFormControllers.js";
  var Controller = System.get("../../node_modules/a1atscript/src/a1atscript.js").Controller;
  var ExampleFormCtrl = function ExampleFormCtrl($scope) {};
  ($traceurRuntime.createClass)(ExampleFormCtrl, {}, {});
  var $__default = ExampleFormCtrl;
  Object.defineProperty(ExampleFormCtrl, "annotations", {get: function() {
      return [new Controller('ExampleFormCtrl', ['$scope'])];
    }});
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/stateInjector.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/xing-frontend-utils/src/xing-frontend-utils/stateInjector.js";
  var $__0 = System.get("../../node_modules/a1atscript/src/a1atscript.js"),
      registerInjector = $__0.registerInjector,
      ToAnnotation = $__0.ToAnnotation;
  var State = function State(stateName) {
    this.stateName = stateName;
  };
  ($traceurRuntime.createClass)(State, {}, {});
  Object.defineProperty(State, "annotations", {get: function() {
      return [new ToAnnotation];
    }});
  var Resolve = function Resolve() {
    for (var inject = [],
        $__2 = 0; $__2 < arguments.length; $__2++)
      inject[$__2] = arguments[$__2];
    this.inject = inject;
  };
  ($traceurRuntime.createClass)(Resolve, {}, {});
  Object.defineProperty(Resolve, "annotations", {get: function() {
      return [new ToAnnotation];
    }});
  var Inject = function Inject() {
    for (var inject = [],
        $__3 = 0; $__3 < arguments.length; $__3++)
      inject[$__3] = arguments[$__3];
    this.inject = inject;
  };
  ($traceurRuntime.createClass)(Inject, {}, {});
  Object.defineProperty(Inject, "annotations", {get: function() {
      return [new ToAnnotation];
    }});
  var StateInjector = function StateInjector() {
    ;
  };
  ($traceurRuntime.createClass)(StateInjector, {
    get annotationClass() {
      return State;
    },
    annotateResolves: function(state) {
      state.resolve = {};
      for (var prop in state) {
        if (typeof state[prop] == "function") {
          var resolveItem = state[prop];
          resolveItem.annotations.forEach((function(annotation) {
            if (annotation instanceof (Resolve.originalClass || Resolve)) {
              resolveItem['$inject'] = annotation.inject;
              state.resolve[prop] = resolveItem;
            }
            if (annotation instanceof (Inject.originalClass || Inject)) {
              resolveItem['$inject'] = annotation.inject;
            }
          }));
        }
      }
    },
    instantiate: function(module, dependencyList) {
      var injector = this;
      module.config(["$stateProvider", function($stateProvider) {
        dependencyList.forEach((function(dependencyObject) {
          var metadata = dependencyObject.metadata;
          var StateClass = dependencyObject.dependency;
          var state = new StateClass();
          injector.annotateResolves(state);
          $stateProvider.state(metadata.stateName, state);
        }));
      }]);
    }
  }, {});
  registerInjector('state', StateInjector);
  return {
    get State() {
      return State;
    },
    get Resolve() {
      return Resolve;
    },
    get Inject() {
      return Inject;
    },
    get StateInjector() {
      return StateInjector;
    }
  };
});
System.registerModule("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/app/exampleForm/example-form.tpl.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/xing-frontend-utils/src/xing-frontend-utils/app/exampleForm/example-form.tpl.js";
  var template = "<h1>Example Form</h1>\n<h2>Still To-Do:</h2>\n<ul>\n  <li>Large Textarea</li>\n  <li>Date</li>\n  <li>Time</li>\n</ul>\n\n<form id='example-form'>\n    <div class='xng-form-row'>\n      <label for=\"username\">Username:</label>\n      <input name=\"username\" placeholder=\"e.g. CoolDev\" required />\n      <span class='messages'></span>\n    </div>\n\n    <div class='xng-form-row'>\n      <label for=\"password\">Password:</label>\n      <input type=\"password\" name=\"password\" placeholder=\"Password\" required />\n      <span class='messages'></span>\n    </div>\n\n    <div class='xng-form-row with-errors'>\n      <label for=\"invalid-data\">Field With Errors:</label>\n      <input type=\"invalid-data\" name=\"invalid-data\" value='Invalid Entry' placeholder=\"Password\" required />\n      <span class='messages error'>Invalid format!</span>\n    </div>\n\n    <div class='xng-form-row with-errors'>\n      <label for=\"valid-data\">Valid Entry:</label>\n      <input name=\"valid-data\" value='Valid Entry'/>\n      <span class='messages success'>Name is available!</span>\n    </div>\n\n    <div class='xng-form-row'>\n      <label for=\"favorite_color\">Favorite Color:</label>\n      <select name='favorite_color' id='favorite_color'>\n        <option>Red</option>\n        <option>Orange</option>\n        <option>Yellow</option>\n        <option>Green</option>\n        <option>Blue</option>\n        <option>Indigo</option>\n        <option>Violet</option>\n        <option>White</option>\n        <option>Black</option>\n      </select>\n      <span class='messages'></span>\n    </div>\n\n    <div class='xng-form-row'>\n      <label>Radio Station:</label>\n      <div class='option-group'>\n        <label><input type='radio' name='radio_station' />KPCC</label>\n        <label><input type='radio' name='radio_station' />KROQ</label>\n        <label><input type='radio' name='radio_station' />KLOS</label>\n        <label><input type='radio' name='radio_station' />KQED</label>\n      </div>\n    </div>\n\n    <div class='xng-form-row'>\n      <label>Artists You Like:</label>\n      <div class='option-group'>\n        <label><input type='checkbox' name='artists' />Kandinsky</label>\n        <label><input type='checkbox' name='artists' />Renoir</label>\n        <label><input type='checkbox' name='artists' />De Kooning</label>\n        <label><input type='checkbox' name='artists' />Pollock</label>\n      </div>\n    </div>\n\n    <div class='xng-form-row'>\n      <label>Favorite Animal:</label>\n      <div class='option-group inline'>\n        <label><input type='radio' name='animal' />Cat</label>\n        <label><input type='radio' name='animal' />Dog</label>\n        <label><input type='radio' name='animal' />Other</label>\n      </div>\n    </div>\n\n    <div class='xng-form-row'>\n      <label for='message'>Message:</label>\n      <textarea name='message' id='message' />\n    </div>\n\n    <div class='xng-form-row'>\n      <button type=\"submit\" ng-click=\"sessionSubmit()\" class=\"call-to-action\">Submit</button>\n    </div>\n\n    <div class='xng-form-row'>\n      <div ng-if=\"passwordShow\" class='input-like'>\n        <a ui-sref='root.inner.passwordsRequest'>Forgot your password?</a>\n      </div>\n    </div>\n</form>\n";
  var $__default = template;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/app/exampleForm/exampleFormStates.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/xing-frontend-utils/src/xing-frontend-utils/app/exampleForm/exampleFormStates.js";
  var State = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/stateInjector.js").State;
  var template = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/app/exampleForm/example-form.tpl.js").default;
  var ExampleFormState = function ExampleFormState() {
    this.url = '^/example-form';
    this.controller = 'ExampleFormCtrl';
    this.template = template;
  };
  ($traceurRuntime.createClass)(ExampleFormState, {}, {});
  Object.defineProperty(ExampleFormState, "annotations", {get: function() {
      return [new State('root.inner.exampleForm')];
    }});
  return {get ExampleFormState() {
      return ExampleFormState;
    }};
});
System.registerModule("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/app/exampleForm/exampleForm.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/xing-frontend-utils/src/xing-frontend-utils/app/exampleForm/exampleForm.js";
  var ExampleFormStates = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/app/exampleForm/exampleFormStates.js");
  var ExampleFormController = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/app/exampleForm/exampleFormControllers.js").default;
  var Module = System.get("../../node_modules/a1atscript/src/a1atscript.js").Module;
  var ExampleForm = new Module('exampleForm', ['ui.router.state', ExampleFormStates, ExampleFormController]);
  var $__default = ExampleForm;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/app/fallback/error-fallback.tpl.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/xing-frontend-utils/src/xing-frontend-utils/app/fallback/error-fallback.tpl.js";
  var template = "<div class=\"critical error\">\n  <img class='icon' src='/assets/icons/alert.svg' />\n\n  <p>A significant error has occurred in the application.\n  Please try returning to the <a href=\"/\">home page.</a></p>\n\n  <p>If you cannot visit the home page, the error is probably caused by a\n  failure in a remote service. Please report the error to your \n  administrator.</p>\n</div>\n";
  var $__default = template;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/app/fallback/fallback.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/xing-frontend-utils/src/xing-frontend-utils/app/fallback/fallback.js";
  var Module = System.get("../../node_modules/a1atscript/src/a1atscript.js").Module;
  var State = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/stateInjector.js").State;
  var template = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/app/fallback/error-fallback.tpl.js").default;
  var FallbackState = function FallbackState() {
    this.url = "/error";
    this.template = template;
  };
  ($traceurRuntime.createClass)(FallbackState, {}, {});
  Object.defineProperty(FallbackState, "annotations", {get: function() {
      return [new State('errorFallback')];
    }});
  var Fallback = new Module('fallback', ['ui.router.state', FallbackState]);
  var $__default = Fallback;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/appConfig.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/xing-frontend-utils/src/xing-frontend-utils/appConfig.js";
  var $__0 = System.get("../../node_modules/a1atscript/src/a1atscript.js"),
      Config = $__0.Config,
      applyAnnotation = $__0.applyAnnotation;
  function whenGoto($location) {
    var search = $location.search();
    if (search.goto) {
      var target = search.goto;
      var queryParts = [];
      for (var key in search) {
        if (search.hasOwnProperty(key) && key != "goto") {
          queryParts.push([key, search[key]].join("="));
        }
      }
      if (queryParts.length > 0) {
        target = [target, queryParts.join("&")].join("?");
      }
      return target;
    } else {
      return false;
    }
  }
  function appConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.when(/.*/, ['$location', whenGoto]);
    $urlRouterProvider.otherwise((function($injector, $location) {
      $injector.get('$state').go('root.homepage.show');
    }));
  }
  applyAnnotation(appConfig, Config, '$stateProvider', '$urlRouterProvider', '$locationProvider');
  return {
    get whenGoto() {
      return whenGoto;
    },
    get appConfig() {
      return appConfig;
    }
  };
});
System.registerModule("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/responsiveMenu/responsive-menu.tpl.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/responsiveMenu/responsive-menu.tpl.js";
  var template = "<nav class=\"nav-collapse\" ng-transclude>\n</nav>\n";
  var $__default = template;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/responsiveMenu/responsiveMenu.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/responsiveMenu/responsiveMenu.js";
  var $__0 = System.get("../../node_modules/a1atscript/src/a1atscript.js"),
      AsModule = $__0.AsModule,
      DirectiveObject = $__0.DirectiveObject;
  var template = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/responsiveMenu/responsive-menu.tpl.js").default;
  var ResponsiveMenu = function ResponsiveMenu() {
    this.restrict = 'E';
    this.template = template;
    this.transclude = true;
    this.scope = true;
  };
  ($traceurRuntime.createClass)(ResponsiveMenu, {link: function(scope, element, attrs) {
      var nav = responsiveNav(".nav-collapse");
    }}, {});
  var $__default = ResponsiveMenu;
  Object.defineProperty(ResponsiveMenu, "annotations", {get: function() {
      return [new AsModule('responsiveMenu'), new DirectiveObject('xngResponsiveMenu')];
    }});
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/stateAttrs/stateAttrs.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/stateAttrs/stateAttrs.js";
  var $__0 = System.get("../../node_modules/a1atscript/src/a1atscript.js"),
      AsModule = $__0.AsModule,
      DirectiveObject = $__0.DirectiveObject;
  var StateAttrs = function StateAttrs($compile, $state) {
    this.$compile = $compile;
    this.$state = $state;
    this.restrict = 'A';
    this.priority = -500;
  };
  ($traceurRuntime.createClass)(StateAttrs, {
    getUiViewName: function(attrs, inherited) {
      var name = attrs.uiView || attrs.name || '';
      return name.indexOf('@') >= 0 ? name : (name + '@' + (inherited ? inherited.state.name : ''));
    },
    link: function(scope, element, attrs, controller, transcludeFn) {
      var name = this.getUiViewName(attrs, element.inheritedData('$uiView'));
      var locals = name && this.$state.$current && this.$state.$current.locals[name];
      if (locals) {
        var viewStateName = locals.$$state.self.name;
        var className = viewStateName.replace(/.*\./, '');
        var idName = viewStateName.replace(/\./g, '_');
        if (!attrs.id) {
          attrs.$set("id", idName);
        }
        attrs.$addClass(className);
      }
    }
  }, {});
  var $__default = StateAttrs;
  Object.defineProperty(StateAttrs, "annotations", {get: function() {
      return [new AsModule('stateAttrs', ['ui.router.state']), new DirectiveObject('xngStateAttrs', ['$compile', '$state'])];
    }});
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/toast/error-list.tpl.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/toast/error-list.tpl.js";
  var template = "<div id=\"error_explanation\">\n  <h2 ng-if=\"header\">{{header}}</h2>\n  <ul>\n    <li ng-repeat=\"message in messages\">\n      {{message}}\n    </li>\n  </ul>\n</div>\n";
  var $__default = template;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/toast/error.tpl.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/toast/error.tpl.js";
  var template = "<div id=\"error_explanation\">\n  <div class=\"toast {{type}}\">{{message}}</div>\n</div>";
  var $__default = template;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/toast/compiler.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/toast/compiler.js";
  function xngCompilerService($q, $http, $injector, $compile, $controller, $templateCache) {
    this.compile = function(options) {
      var templateUrl = options.templateUrl;
      var template = options.template || '';
      var controller = options.controller;
      var controllerAs = options.controllerAs;
      var resolve = options.resolve || {};
      var locals = options.locals || {};
      var transformTemplate = options.transformTemplate || angular.identity;
      angular.forEach(resolve, function(value, key) {
        if (angular.isString(value)) {
          resolve[key] = $injector.get(value);
        } else {
          resolve[key] = $injector.invoke(value);
        }
      });
      angular.extend(resolve, locals);
      if (templateUrl) {
        resolve.$template = $http.get(templateUrl, {cache: $templateCache}).then(function(response) {
          return response.data;
        });
      } else {
        resolve.$template = $q.when(template);
      }
      return $q.all(resolve).then(function(locals) {
        var template = transformTemplate(locals.$template);
        var element = angular.element('<div>').html(template).contents();
        var linkFn = $compile(element);
        return {
          locals: locals,
          element: element,
          link: function link(scope) {
            locals.$scope = scope;
            if (controller) {
              var ctrl = $controller(controller, locals);
              element.data('$ngControllerController', ctrl);
              element.children().data('$ngControllerController', ctrl);
              if (controllerAs) {
                scope[controllerAs] = ctrl;
              }
            }
            return linkFn(scope);
          }
        };
      });
    };
  }
  angular.module("xing.utils.compiler", []).service('$xngCompiler', ['$q', '$http', '$injector', '$compile', '$controller', '$templateCache', xngCompilerService]);
  return {};
});
System.registerModule("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/toast/interimElement.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/toast/interimElement.js";
  System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/toast/compiler.js");
  angular.module("xing.utils.interimElement", ["xing.utils.compiler"]).factory('$$interimElement', ['$q', '$rootScope', '$timeout', '$rootElement', '$animate', '$xngCompiler', InterimElementFactory]);
  function InterimElementFactory($q, $rootScope, $timeout, $rootElement, $animate, $xngCompiler) {
    return function createInterimElementService(defaults) {
      var stack = [];
      var parent = $rootElement.find('body');
      if (!parent.length) {
        parent = $rootElement;
      }
      defaults = angular.extend({
        parent: parent,
        onShow: function(scope, $el, options) {
          return $animate.enter($el, options.parent);
        },
        onRemove: function(scope, $el, options) {
          return $animate.leave($el);
        }
      }, defaults || {});
      var service;
      service = {
        show: show,
        hide: hide,
        cancel: cancel
      };
      return service;
      function show(options) {
        if (stack.length) {
          service.hide();
        }
        var interimElement = new InterimElement(options);
        stack.push(interimElement);
        return interimElement.show().then(function() {
          return interimElement.deferred.promise;
        });
      }
      function hide(success) {
        var interimElement = stack.shift();
        interimElement.remove().then(function() {
          interimElement.deferred.resolve(success);
        });
      }
      function cancel(reason) {
        var interimElement = stack.shift();
        interimElement.remove().then(function() {
          interimElement.deferred.reject(reason);
        });
      }
      function InterimElement(options) {
        var self;
        var hideTimeout,
            element;
        options = options || {};
        options = angular.extend({scope: options.scope || $rootScope.$new(options.isolateScope)}, defaults, options);
        self = {
          options: options,
          deferred: $q.defer(),
          show: function() {
            return $xngCompiler.compile(options).then(function(compiledData) {
              element = compiledData.link(options.scope);
              var ret = options.onShow(options.scope, element, options);
              return $q.when(ret).then(startHideTimeout);
              function startHideTimeout() {
                if (options.hideDelay) {
                  hideTimeout = $timeout(service.hide, options.hideDelay);
                }
              }
            });
          },
          cancelTimeout: function() {
            if (hideTimeout) {
              $timeout.cancel(hideTimeout);
              hideTimeout = undefined;
            }
          },
          remove: function() {
            self.cancelTimeout();
            var ret = options.onRemove(options.scope, element, options);
            return $q.when(ret).then(function() {
              options.scope.$destroy();
            });
          }
        };
        return self;
      }
    };
  }
  return {};
});
System.registerModule("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/toast/notice.tpl.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/toast/notice.tpl.js";
  var template = "<div id=\"messages\">\n  <div class=\"toast {{type}}\">{{content}}</div>\n</div>\n";
  var $__default = template;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/toast/swipe.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/toast/swipe.js";
  (function() {
    angular.module("xing.utils.swipe", ['ng']).factory("$xngSwipe", function() {
      var attachNoop = function() {
        return angular.noop;
      };
      return function SwipeService(scope, eventTypes) {
        if (!eventTypes) {
          eventTypes = "swipeleft swiperight";
        }
        return function configureFor(element, onSwipeCallback, attachLater) {
          var hammertime = new Hammer(element[0], {recognizers: addRecognizers([], eventTypes)});
          if (!attachLater) {
            attachSwipe();
          }
          scope.$on('$destroy', function() {
            hammertime.destroy();
          });
          return attachSwipe;
          function swipeHandler(ev) {
            ev.srcEvent.stopPropagation();
            if (angular.isFunction(onSwipeCallback)) {
              scope.$apply(function() {
                onSwipeCallback(ev);
              });
            }
          }
          function attachSwipe() {
            hammertime.on(eventTypes, swipeHandler);
            return function detachSwipe() {
              hammertime.off(eventTypes);
            };
          }
          function addRecognizers(list, events) {
            var hasPanning = (events.indexOf("pan") > -1);
            var hasSwipe = (events.indexOf("swipe") > -1);
            if (hasPanning) {
              list.push([Hammer.Pan, {direction: Hammer.DIRECTION_HORIZONTAL}]);
            }
            if (hasSwipe) {
              list.push([Hammer.Swipe, {direction: Hammer.DIRECTION_HORIZONTAL}]);
            }
            return list;
          }
        };
      };
    }).directive("xngSwipeLeft", ['$parse', '$xngSwipe', function XNGSwipeLeft($parse, $xngSwipe) {
      return {
        restrict: 'A',
        link: swipePostLink($parse, $xngSwipe, "SwipeLeft")
      };
    }]).directive("xngSwipeRight", ['$parse', '$xngSwipe', function XNGSwipeRight($parse, $xngSwipe) {
      return {
        restrict: 'A',
        link: swipePostLink($parse, $xngSwipe, "SwipeRight")
      };
    }]);
    function swipePostLink($parse, $xngSwipe, name) {
      return function(scope, element, attrs) {
        var direction = name.toLowerCase();
        var directiveName = "xng" + name;
        var parentGetter = $parse(attrs[directiveName]) || angular.noop;
        var configureSwipe = $xngSwipe(scope, direction);
        var requestSwipe = function(locals) {
          parentGetter(scope, locals);
        };
        configureSwipe(element, function onHandleSwipe(ev) {
          if (ev.type == direction) {
            requestSwipe();
          }
        });
      };
    }
  })();
  return {};
});
System.registerModule("../../node_modules/xing-inflector/dist/xing-inflector.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/xing-inflector/dist/xing-inflector.js";
  var $__0 = System.get("../../node_modules/a1atscript/src/a1atscript.js"),
      AsModule = $__0.AsModule,
      Service = $__0.Service;
  var Inflector = function Inflector() {
    ;
  };
  ($traceurRuntime.createClass)(Inflector, {
    camelize: function(key) {
      if (!angular.isString(key)) {
        return key;
      }
      return key.replace(/_[\w\d]/g, function(match, index, string) {
        return index === 0 ? match : string.charAt(index + 1).toUpperCase();
      });
    },
    humanize: function(key) {
      if (!angular.isString(key)) {
        return key;
      }
      return key.replace(/_/g, ' ').replace(/(\w+)/g, function(match) {
        return match.charAt(0).toUpperCase() + match.slice(1);
      });
    },
    underscore: function(key) {
      if (!angular.isString(key)) {
        return key;
      }
      return key.replace(/[A-Z]/g, function(match, index) {
        return index === 0 ? match : '_' + match.toLowerCase();
      });
    },
    dasherize: function(key) {
      if (!angular.isString(key)) {
        return key;
      }
      return key.replace(/[A-Z]/g, function(match, index) {
        return index === 0 ? match : '-' + match.toLowerCase();
      });
    },
    pluralize: function(value) {
      return value + 's';
    }
  }, {});
  var $__default = Inflector;
  Object.defineProperty(Inflector, "annotations", {get: function() {
      return [new AsModule('inflector'), new Service('Inflector')];
    }});
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/toast/toast.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/toast/toast.js";
  var $__0 = System.get("../../node_modules/a1atscript/src/a1atscript.js"),
      applyAnnotation = $__0.applyAnnotation,
      Factory = $__0.Factory,
      Controller = $__0.Controller,
      Directive = $__0.Directive,
      Module = $__0.Module;
  System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/toast/swipe.js");
  System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/toast/interimElement.js");
  var Inflector = System.get("../../node_modules/xing-inflector/dist/xing-inflector.js").default;
  var errorListTemplate = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/toast/error-list.tpl.js").default;
  var errorTemplate = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/toast/error.tpl.js").default;
  var noticeTemplate = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/toast/notice.tpl.js").default;
  function xngToastDirective() {
    return {restrict: 'E'};
  }
  applyAnnotation(xngToastDirective, Directive, '$xngToast');
  var XngToastErrorListCtrl = function XngToastErrorListCtrl($scope, type, header, messages) {
    $scope.type = type;
    $scope.header = header;
    $scope.messages = messages;
  };
  ($traceurRuntime.createClass)(XngToastErrorListCtrl, {}, {});
  Object.defineProperty(XngToastErrorListCtrl, "annotations", {get: function() {
      return [new Controller('$xngToastErrorListCtrl', ['$scope', 'type', 'header', 'messages'])];
    }});
  var XngToastErrorCtrl = function XngToastErrorCtrl($scope, type, message) {
    $scope.type = type;
    $scope.message = message;
  };
  ($traceurRuntime.createClass)(XngToastErrorCtrl, {}, {});
  Object.defineProperty(XngToastErrorCtrl, "annotations", {get: function() {
      return [new Controller('$xngToastErrorCtrl', ['$scope', 'type', 'message'])];
    }});
  var XngToastNoticeCtrl = function XngToastNoticeCtrl($scope, type, message) {
    $scope.type = type;
    $scope.message = message;
  };
  ($traceurRuntime.createClass)(XngToastNoticeCtrl, {}, {});
  Object.defineProperty(XngToastNoticeCtrl, "annotations", {get: function() {
      return [new Controller('$xngToastNoticeCtrl', ['$scope', 'type', 'message'])];
    }});
  function xngToastService($timeout, $$interimElement, $animate, $xngSwipe, Inflector) {
    var factoryDef = {
      onShow: onShow,
      onRemove: onRemove,
      position: 'bottom left',
      hideDelay: 3000
    };
    var toastElement = angular.element(document.getElementById("toast_main"));
    var $xngToast = $$interimElement(factoryDef);
    $xngToast.notice = function(message) {
      var type = arguments[1] !== (void 0) ? arguments[1] : "notice";
      return this.show({
        parent: toastElement,
        template: noticeTemplate,
        position: 'top left',
        locals: {
          type: type,
          message: message
        },
        controller: '$xngToastNoticeCtrl'
      });
    };
    $xngToast.error = function(message) {
      var type = arguments[1] !== (void 0) ? arguments[1] : "error";
      return this.show({
        parent: toastElement,
        template: errorTemplate,
        position: 'top left',
        locals: {
          type: type,
          message: message
        },
        controller: '$xngToastErrorCtrl'
      });
    };
    $xngToast.errorList = function(errors) {
      var header = arguments[1] !== (void 0) ? arguments[1] : "";
      var type = arguments[2] !== (void 0) ? arguments[2] : "error";
      var messages = [];
      if (Array.isArray(errors)) {
        messages = errors;
      } else {
        for (var key in errors) {
          if (errors.hasOwnProperty(key)) {
            messages.push((Inflector.humanize(key) + " " + errors[key]));
          }
        }
      }
      return this.show({
        parent: toastElement,
        template: errorListTemplate,
        position: 'top left',
        locals: {
          type: type,
          header: header,
          messages: messages
        },
        controller: '$xngToastErrorListCtrl'
      });
    };
    return $xngToast;
    function onShow(scope, element, options) {
      element.addClass(options.position);
      options.parent.addClass(toastOpenClass(options.position));
      var configureSwipe = $xngSwipe(scope, 'swipeleft swiperight');
      options.detachSwipe = configureSwipe(element, function(ev) {
        element.addClass(ev.type);
        $timeout($xngToast.hide);
      });
      return $animate.enter(element, options.parent);
    }
    function onRemove(scope, element, options) {
      options.detachSwipe();
      options.parent.removeClass(toastOpenClass(options.position));
      return $animate.leave(element);
    }
    function toastOpenClass(position) {
      return 'xng-toast-open-' + (position.indexOf('top') > -1 ? 'top' : 'bottom');
    }
  }
  applyAnnotation(xngToastService, Factory, '$xngToast', ['$timeout', '$$interimElement', '$animate', '$xngSwipe', 'Inflector']);
  var Toast = new Module('toast', ["xing.utils.interimElement", "xing.utils.swipe", Inflector, xngToastDirective, XngToastErrorListCtrl, XngToastErrorCtrl, XngToastNoticeCtrl, xngToastService]);
  var $__default = Toast;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/unimplemented/unimplemented.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/unimplemented/unimplemented.js";
  var DirectiveObject = System.get("../../node_modules/a1atscript/src/a1atscript.js").DirectiveObject;
  var UnimplementedDirective = function UnimplementedDirective() {
    this.restrict = 'A';
  };
  ($traceurRuntime.createClass)(UnimplementedDirective, {link: function(scope, element, attrs) {
      element.on('click', (function() {
        alert('This feature is not yet implemented.  The item you just clicked on is just a visual placeholder for a future part of this application.');
      }));
    }}, {});
  var $__default = UnimplementedDirective;
  Object.defineProperty(UnimplementedDirective, "annotations", {get: function() {
      return [new DirectiveObject('xngUnimplemented', [])];
    }});
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/serializer.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/xing-frontend-utils/src/xing-frontend-utils/serializer.js";
  var Inflector = System.get("../../node_modules/xing-inflector/dist/xing-inflector.js").default;
  var $__1 = System.get("../../node_modules/a1atscript/src/a1atscript.js"),
      applyAnnotation = $__1.applyAnnotation,
      Module = $__1.Module,
      Factory = $__1.Factory,
      Provider = $__1.Provider;
  var SerializerProvider = function SerializerProvider() {
    var defaultOptions = {
      underscore: undefined,
      camelize: undefined,
      pluralize: undefined,
      exclusionMatchers: []
    };
    this.underscore = function(fn) {
      defaultOptions.underscore = fn;
      return this;
    };
    this.camelize = function(fn) {
      defaultOptions.camelize = fn;
      return this;
    };
    this.pluralize = function(fn) {
      defaultOptions.pluralize = fn;
      return this;
    };
    this.exclusionMatchers = function(exclusions) {
      defaultOptions.exclusionMatchers = exclusions;
      return this;
    };
    this.$get = ['$injector', 'Inflector', function($injector, Inflector) {
      defaultOptions.underscore = defaultOptions.underscore || Inflector.underscore;
      defaultOptions.camelize = defaultOptions.camelize || Inflector.camelize;
      defaultOptions.pluralize = defaultOptions.pluralize || Inflector.pluralize;
      function Serializer() {
        this.exclusions = {};
        this.inclusions = {};
        this.serializeMappings = {};
        this.deserializeMappings = {};
        this.customSerializedAttributes = {};
        this.preservedAttributes = {};
        this.options = angular.extend({excludeByDefault: false}, defaultOptions || {});
      }
      Serializer.prototype.exclude = function() {
        var exclusions = this.exclusions;
        angular.forEach(arguments, function(attributeName) {
          exclusions[attributeName] = false;
        });
        return this;
      };
      Serializer.prototype.only = function() {
        var inclusions = this.inclusions;
        this.options.excludeByDefault = true;
        angular.forEach(arguments, function(attributeName) {
          inclusions[attributeName] = true;
        });
        return this;
      };
      Serializer.prototype.rename = function(javascriptName, jsonName, bidirectional) {
        this.serializeMappings[javascriptName] = jsonName;
        if (bidirectional || bidirectional === undefined) {
          this.deserializeMappings[jsonName] = javascriptName;
        }
        return this;
      };
      Serializer.prototype.add = function(attributeName, value) {
        this.customSerializedAttributes[attributeName] = value;
        return this;
      };
      Serializer.prototype.preserve = function(attributeName) {
        this.preservedAttributes[attributeName] = true;
        return this;
      };
      Serializer.prototype.isExcludedFromSerialization = function(attributeName) {
        if ((this.options.excludeByDefault && !this.inclusions.hasOwnProperty(attributeName)) || this.exclusions.hasOwnProperty(attributeName)) {
          return true;
        }
        if (this.options.exclusionMatchers) {
          var excluded = false;
          angular.forEach(this.options.exclusionMatchers, function(matcher) {
            if (angular.isString(matcher)) {
              excluded = excluded || attributeName.indexOf(matcher) === 0;
            } else if (angular.isFunction(matcher)) {
              excluded = excluded || matcher.call(undefined, attributeName);
            } else if (matcher instanceof RegExp) {
              excluded = excluded || matcher.test(attributeName);
            }
          });
          return excluded;
        }
        return false;
      };
      Serializer.prototype.getSerializedAttributeName = function(attributeName) {
        var mappedName = this.serializeMappings[attributeName] || attributeName;
        var mappedNameExcluded = this.isExcludedFromSerialization(mappedName),
            attributeNameExcluded = this.isExcludedFromSerialization(attributeName);
        if (this.options.excludeByDefault) {
          if (mappedNameExcluded && attributeNameExcluded) {
            return undefined;
          }
        } else {
          if (mappedNameExcluded || attributeNameExcluded) {
            return undefined;
          }
        }
        return this.underscore(mappedName);
      };
      Serializer.prototype.isExcludedFromDeserialization = function(attributeName) {
        return false;
      };
      Serializer.prototype.getDeserializedAttributeName = function(attributeName) {
        var camelizedName = this.camelize(attributeName);
        camelizedName = this.deserializeMappings[attributeName] || this.deserializeMappings[camelizedName] || camelizedName;
        if (this.isExcludedFromDeserialization(attributeName) || this.isExcludedFromDeserialization(camelizedName)) {
          return undefined;
        }
        return camelizedName;
      };
      Serializer.prototype.serializeValue = function(data) {
        var result = data,
            self = this;
        if (angular.isArray(data)) {
          result = [];
          angular.forEach(data, function(value) {
            result.push(self.serializeValue(value));
          });
        } else if (angular.isObject(data)) {
          if (angular.isDate(data)) {
            return data;
          }
          result = {};
          angular.forEach(data, function(value, key) {
            if (!angular.isFunction(value)) {
              self.serializeAttribute(result, key, value);
            }
          });
        }
        return result;
      };
      Serializer.prototype.serializeAttribute = function(data, attribute, value) {
        var serializedAttributeName = this.getSerializedAttributeName(attribute);
        if (serializedAttributeName === undefined) {
          return ;
        }
        data[serializedAttributeName] = this.serializeValue(value);
      };
      Serializer.prototype.serialize = function(data) {
        var result = this.serializeValue(data),
            self = this;
        if (angular.isObject(result)) {
          angular.forEach(this.customSerializedAttributes, function(value, key) {
            if (angular.isFunction(value)) {
              value = value.call(data, data);
            }
            self.serializeAttribute(result, key, value);
          });
        }
        return result;
      };
      Serializer.prototype.deserializeValue = function(data) {
        var result = data,
            self = this;
        if (angular.isArray(data)) {
          result = [];
          angular.forEach(data, function(value) {
            result.push(self.deserializeValue(value));
          });
        } else if (angular.isObject(data)) {
          if (angular.isDate(data)) {
            return data;
          }
          result = {};
          angular.forEach(data, function(value, key) {
            self.deserializeAttribute(result, key, value);
          });
        }
        return result;
      };
      Serializer.prototype.deserializeAttribute = function(data, attribute, value) {
        var attributeName = this.getDeserializedAttributeName(attribute);
        if (attributeName === undefined) {
          return ;
        }
        if (this.preservedAttributes[attributeName]) {
          data[attributeName] = value;
        } else {
          data[attributeName] = this.deserializeValue(value);
        }
      };
      Serializer.prototype.deserialize = function(data) {
        return this.deserializeValue(data);
      };
      Serializer.prototype.pluralize = function(value) {
        if (this.options.pluralize) {
          return this.options.pluralize(value);
        }
        return value;
      };
      Serializer.prototype.underscore = function(value) {
        if (this.options.underscore) {
          return this.options.underscore(value);
        }
        return value;
      };
      Serializer.prototype.camelize = function(value) {
        if (this.options.camelize) {
          return this.options.camelize(value);
        }
        return value;
      };
      return Serializer;
    }];
  };
  ($traceurRuntime.createClass)(SerializerProvider, {}, {});
  Object.defineProperty(SerializerProvider, "annotations", {get: function() {
      return [new Provider('Serializer')];
    }});
  function RequestInterceptor(Serializer) {
    var serializer = new Serializer();
    return function(elem, operation, what) {
      var retElem = elem;
      if (operation === 'post' || operation === 'put') {
        retElem = serializer.serialize(elem);
      }
      return retElem;
    };
  }
  applyAnnotation(RequestInterceptor, Factory, 'RequestInterceptor', ['Serializer']);
  function ResponseInterceptor(Serializer) {
    var serializer = new Serializer();
    return function(data, operation, what, url, response, deferred) {
      return serializer.deserialize(data);
    };
  }
  applyAnnotation(ResponseInterceptor, Factory, 'ResponseInterceptor', ['Serializer']);
  var Serializer = new Module('serializer', [Inflector, SerializerProvider, RequestInterceptor, ResponseInterceptor]);
  var $__default = Serializer;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/stateClasses.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/xing-frontend-utils/src/xing-frontend-utils/stateClasses.js";
  var Resolve = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/stateInjector.js").Resolve;
  var LoggedInOnlyState = function LoggedInOnlyState() {
    ;
  };
  ($traceurRuntime.createClass)(LoggedInOnlyState, {currentUser: function($auth, $state) {
      return $auth.validateUser().then((function(user) {
        return user;
      }), (function(failure) {
        $state.go('root.inner.sessions');
      }));
    }}, {});
  Object.defineProperty(LoggedInOnlyState.prototype.currentUser, "annotations", {get: function() {
      return [new Resolve('$auth', '$state')];
    }});
  var AdminOnlyState = function AdminOnlyState() {
    $traceurRuntime.superConstructor($AdminOnlyState).apply(this, arguments);
    ;
  };
  var $AdminOnlyState = AdminOnlyState;
  ($traceurRuntime.createClass)(AdminOnlyState, {onlyAdmin: function() {
      return true;
    }}, {}, LoggedInOnlyState);
  Object.defineProperty(AdminOnlyState.prototype.onlyAdmin, "annotations", {get: function() {
      return [new Resolve()];
    }});
  var TrackAdminState = function TrackAdminState() {
    ;
  };
  ($traceurRuntime.createClass)(TrackAdminState, {isAdmin: function($auth) {
      return $auth.validateUser().then((function(success) {
        return true;
      }), (function(failure) {
        return false;
      }));
    }}, {});
  Object.defineProperty(TrackAdminState.prototype.isAdmin, "annotations", {get: function() {
      return [new Resolve('$auth')];
    }});
  return {
    get LoggedInOnlyState() {
      return LoggedInOnlyState;
    },
    get AdminOnlyState() {
      return AdminOnlyState;
    },
    get TrackAdminState() {
      return TrackAdminState;
    }
  };
});
System.registerModule("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/errorLimiter.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/xing-frontend-utils/src/xing-frontend-utils/errorLimiter.js";
  var ErrorLimiter = function ErrorLimiter(uiState, failsafeStateName) {
    this.uiState = uiState;
    this.failsafeStateName = failsafeStateName;
    this.failedTransitions = {};
    this.errorLimit = 3;
  };
  ($traceurRuntime.createClass)(ErrorLimiter, {
    recordTransition: function(from, to) {
      if (typeof this.failedTransitions[from] === "undefined") {
        this.failedTransitions[from] = {};
      }
      if (typeof this.failedTransitions[from][to] === "undefined") {
        this.failedTransitions[from][to] = 0;
      }
      this.failedTransitions[from][to] = this.failedTransitions[from][to] + 1;
    },
    transitionCount: function(from, to) {
      if (typeof this.failedTransitions[from] === "undefined") {
        return 0;
      }
      if (typeof this.failedTransitions[from][to] === "undefined") {
        return 0;
      }
      return this.failedTransitions[from][to];
    },
    goToFailsafe: function() {
      this.uiState.go(this.failsafeStateName);
    },
    clearTransitionRecords: function() {
      this.failedTransitions = {};
    },
    transitionError: function(fromState, toState) {
      var from = fromState.name,
          to = toState.name;
      this.recordTransition(from, to);
      if (this.transitionCount(from, to) >= this.errorLimit) {
        this.goToFailsafe();
      }
    },
    transitionSuccess: function(fromState, toState) {
      var from = fromState.name,
          to = toState.name;
      this.clearTransitionRecords();
    }
  }, {});
  var $__default = ErrorLimiter;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/stateFallback.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/xing-frontend-utils/src/xing-frontend-utils/stateFallback.js";
  var ErrorLimiter = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/errorLimiter.js").default;
  var $__1 = System.get("../../node_modules/a1atscript/src/a1atscript.js"),
      Run = $__1.Run,
      applyAnnotation = $__1.applyAnnotation;
  function stateFallback($rootScope, $state) {
    var limiter = new ErrorLimiter($state, "errorFallback");
    $rootScope.$on('$stateChangeError', (function(event, toState, toParams, fromState, fromParams, error) {
      limiter.transitionError(fromState, toState);
    }));
    $rootScope.$on('$stateChangeSuccess', (function(event, toState, toParams, fromState, fromParams) {
      limiter.transitionSuccess(fromState, toState);
    }));
  }
  var $__default = stateFallback;
  applyAnnotation(stateFallback, Run, "$rootScope", "$state");
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/ui-route-logger.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/xing-frontend-utils/src/xing-frontend-utils/ui-route-logger.js";
  var $__0 = System.get("../../node_modules/a1atscript/src/a1atscript.js"),
      applyAnnotation = $__0.applyAnnotation,
      AsModule = $__0.AsModule,
      Run = $__0.Run;
  function uiRouteLogger($rootScope, $state, noTable) {
    if (noTable) {
      $rootScope.$on('$stateChangeStart', (function(event, toState, toParams, fromState, fromParams) {
        console.log("Routing Event", event.name);
        console.log("From State", fromState.name, fromState.url);
        console.log("To State", toState.name, toState.url);
      }));
      $rootScope.$on('$stateNotFound', (function(event, missingState) {
        console.log("Routing Event", event.name);
        console.log("Missing state", missingState);
        console.log("Existing states");
        $state.get().forEach((function(state) {
          console.log(state);
        }));
        console.log("End of states");
      }));
      $rootScope.$on('$stateChangeSuccess', (function(event, toState) {
        console.log("Routing Event", event.name);
        console.log("To State", toState.name, toState.url);
      }));
      $rootScope.$on('$stateChangeError', (function(event, toState, toParams, fromState, fromParams, error) {
        console.log("Routing Event", event.name);
        console.log("From State", fromState);
        console.log("To State", toState);
        console.log("Error", error);
        console.log(error.stack);
      }));
      $rootScope.$on('$viewContentLoaded', (function(event) {
        console.log("view event", event.name);
      }));
    } else {
      $rootScope.$on('$stateChangeStart', (function(event, toState, toParams, fromState, fromParams) {
        console.group();
        console.table({event: event});
        console.table({
          fromState: fromState,
          toState: toState
        });
        console.table({
          fromParams: fromParams,
          toParams: toParams
        });
        console.groupEnd();
      }));
      $rootScope.$on('$stateNotFound', (function(event, missingState) {
        console.table({
          event: event,
          missingState: missingState
        });
        console.table($state.get());
      }));
      $rootScope.$on('$stateChangeSuccess', (function(event, toState) {
        console.group();
        console.table({event: event});
        console.table({toState: toState});
        console.groupEnd();
      }));
      $rootScope.$on('$stateChangeError', (function(event, toState, toParams, fromState, fromParams, error) {
        console.group();
        console.table({event: event});
        console.table({error: error});
        console.table({
          fromState: fromState,
          toState: toState
        });
        console.log("ui-router error", error.stack);
        console.groupEnd();
      }));
    }
  }
  var $__default = uiRouteLogger;
  applyAnnotation(uiRouteLogger, AsModule, 'route-logger');
  applyAnnotation(uiRouteLogger, Run, '$rootScope', '$state');
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/whenGoto.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/xing-frontend-utils/src/xing-frontend-utils/whenGoto.js";
  function whenGoto($location) {
    var search = $location.search();
    if (search.goto) {
      var target = search.goto;
      var queryParts = [];
      for (var key in search) {
        if (search.hasOwnProperty(key) && key != "goto") {
          queryParts.push([key, search[key]].join("="));
        }
      }
      if (queryParts.length > 0) {
        target = [target, queryParts.join("&")].join("?");
      }
      return target;
    } else {
      return false;
    }
  }
  var $__default = whenGoto;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../node_modules/xing-frontend-utils/src/xing-frontend-utils.js", [], function() {
  "use strict";
  var __moduleName = "../../node_modules/xing-frontend-utils/src/xing-frontend-utils.js";
  var $___46__46__47__46__46__47_node_95_modules_47_xing_45_frontend_45_utils_47_src_47_xing_45_frontend_45_utils_47_app_47_exampleForm_47_exampleForm_46_js__ = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/app/exampleForm/exampleForm.js");
  var $___46__46__47__46__46__47_node_95_modules_47_xing_45_frontend_45_utils_47_src_47_xing_45_frontend_45_utils_47_app_47_fallback_47_fallback_46_js__ = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/app/fallback/fallback.js");
  var $___46__46__47__46__46__47_node_95_modules_47_xing_45_frontend_45_utils_47_src_47_xing_45_frontend_45_utils_47_components_47_responsiveMenu_47_responsiveMenu_46_js__ = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/responsiveMenu/responsiveMenu.js");
  var $___46__46__47__46__46__47_node_95_modules_47_xing_45_frontend_45_utils_47_src_47_xing_45_frontend_45_utils_47_components_47_stateAttrs_47_stateAttrs_46_js__ = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/stateAttrs/stateAttrs.js");
  var $___46__46__47__46__46__47_node_95_modules_47_xing_45_frontend_45_utils_47_src_47_xing_45_frontend_45_utils_47_components_47_toast_47_toast_46_js__ = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/toast/toast.js");
  var $___46__46__47__46__46__47_node_95_modules_47_xing_45_frontend_45_utils_47_src_47_xing_45_frontend_45_utils_47_components_47_unimplemented_47_unimplemented_46_js__ = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/components/unimplemented/unimplemented.js");
  var $___46__46__47__46__46__47_node_95_modules_47_xing_45_frontend_45_utils_47_src_47_xing_45_frontend_45_utils_47_serializer_46_js__ = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/serializer.js");
  var $___46__46__47__46__46__47_node_95_modules_47_xing_45_frontend_45_utils_47_src_47_xing_45_frontend_45_utils_47_stateClasses_46_js__ = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/stateClasses.js");
  var $___46__46__47__46__46__47_node_95_modules_47_xing_45_frontend_45_utils_47_src_47_xing_45_frontend_45_utils_47_whenGoto_46_js__ = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/whenGoto.js");
  var $___46__46__47__46__46__47_node_95_modules_47_xing_45_frontend_45_utils_47_src_47_xing_45_frontend_45_utils_47_stateFallback_46_js__ = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/stateFallback.js");
  var $___46__46__47__46__46__47_node_95_modules_47_xing_45_frontend_45_utils_47_src_47_xing_45_frontend_45_utils_47_ui_45_route_45_logger_46_js__ = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/ui-route-logger.js");
  var $___46__46__47__46__46__47_node_95_modules_47_xing_45_frontend_45_utils_47_src_47_xing_45_frontend_45_utils_47_stateInjector_46_js__ = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/stateInjector.js");
  var $___46__46__47__46__46__47_node_95_modules_47_xing_45_frontend_45_utils_47_src_47_xing_45_frontend_45_utils_47_appConfig_46_js__ = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/appConfig.js");
  return {
    get ExampleForm() {
      return $___46__46__47__46__46__47_node_95_modules_47_xing_45_frontend_45_utils_47_src_47_xing_45_frontend_45_utils_47_app_47_exampleForm_47_exampleForm_46_js__.default;
    },
    get Fallback() {
      return $___46__46__47__46__46__47_node_95_modules_47_xing_45_frontend_45_utils_47_src_47_xing_45_frontend_45_utils_47_app_47_fallback_47_fallback_46_js__.default;
    },
    get ResponsiveMenu() {
      return $___46__46__47__46__46__47_node_95_modules_47_xing_45_frontend_45_utils_47_src_47_xing_45_frontend_45_utils_47_components_47_responsiveMenu_47_responsiveMenu_46_js__.default;
    },
    get StateAttrs() {
      return $___46__46__47__46__46__47_node_95_modules_47_xing_45_frontend_45_utils_47_src_47_xing_45_frontend_45_utils_47_components_47_stateAttrs_47_stateAttrs_46_js__.default;
    },
    get Toast() {
      return $___46__46__47__46__46__47_node_95_modules_47_xing_45_frontend_45_utils_47_src_47_xing_45_frontend_45_utils_47_components_47_toast_47_toast_46_js__.default;
    },
    get UnimplementedDirective() {
      return $___46__46__47__46__46__47_node_95_modules_47_xing_45_frontend_45_utils_47_src_47_xing_45_frontend_45_utils_47_components_47_unimplemented_47_unimplemented_46_js__.default;
    },
    get Serializer() {
      return $___46__46__47__46__46__47_node_95_modules_47_xing_45_frontend_45_utils_47_src_47_xing_45_frontend_45_utils_47_serializer_46_js__.default;
    },
    get LoggedInOnlyState() {
      return $___46__46__47__46__46__47_node_95_modules_47_xing_45_frontend_45_utils_47_src_47_xing_45_frontend_45_utils_47_stateClasses_46_js__.LoggedInOnlyState;
    },
    get AdminOnlyState() {
      return $___46__46__47__46__46__47_node_95_modules_47_xing_45_frontend_45_utils_47_src_47_xing_45_frontend_45_utils_47_stateClasses_46_js__.AdminOnlyState;
    },
    get TrackAdminState() {
      return $___46__46__47__46__46__47_node_95_modules_47_xing_45_frontend_45_utils_47_src_47_xing_45_frontend_45_utils_47_stateClasses_46_js__.TrackAdminState;
    },
    get whenGoto() {
      return $___46__46__47__46__46__47_node_95_modules_47_xing_45_frontend_45_utils_47_src_47_xing_45_frontend_45_utils_47_whenGoto_46_js__.default;
    },
    get stateFallback() {
      return $___46__46__47__46__46__47_node_95_modules_47_xing_45_frontend_45_utils_47_src_47_xing_45_frontend_45_utils_47_stateFallback_46_js__.default;
    },
    get uiRouteLogger() {
      return $___46__46__47__46__46__47_node_95_modules_47_xing_45_frontend_45_utils_47_src_47_xing_45_frontend_45_utils_47_ui_45_route_45_logger_46_js__.default;
    },
    get State() {
      return $___46__46__47__46__46__47_node_95_modules_47_xing_45_frontend_45_utils_47_src_47_xing_45_frontend_45_utils_47_stateInjector_46_js__.State;
    },
    get Resolve() {
      return $___46__46__47__46__46__47_node_95_modules_47_xing_45_frontend_45_utils_47_src_47_xing_45_frontend_45_utils_47_stateInjector_46_js__.Resolve;
    },
    get Inject() {
      return $___46__46__47__46__46__47_node_95_modules_47_xing_45_frontend_45_utils_47_src_47_xing_45_frontend_45_utils_47_stateInjector_46_js__.Inject;
    },
    get StateInjector() {
      return $___46__46__47__46__46__47_node_95_modules_47_xing_45_frontend_45_utils_47_src_47_xing_45_frontend_45_utils_47_stateInjector_46_js__.StateInjector;
    },
    get appConfig() {
      return $___46__46__47__46__46__47_node_95_modules_47_xing_45_frontend_45_utils_47_src_47_xing_45_frontend_45_utils_47_appConfig_46_js__.appConfig;
    }
  };
});
System.registerModule("../../src/app/appConfig.js", [], function() {
  "use strict";
  var __moduleName = "../../src/app/appConfig.js";
  var Config = System.get("../../node_modules/a1atscript/src/a1atscript.js").Config;
  var whenGoto = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils.js").whenGoto;
  function appConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.when(/.*/, ['$location', whenGoto]);
    $urlRouterProvider.otherwise((function($injector, $location) {
      $injector.get('$state').go('root.homepage.show');
    }));
  }
  var $__default = appConfig;
  Object.defineProperty(appConfig, "annotations", {get: function() {
      return [new Config('$stateProvider', '$urlRouterProvider', '$locationProvider')];
    }});
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../src/app/auth/config.js", [], function() {
  "use strict";
  var __moduleName = "../../src/app/auth/config.js";
  var $__0 = System.get("../../node_modules/a1atscript/src/a1atscript.js"),
      Provider = $__0.Provider,
      Module = $__0.Module;
  function authConfig() {
    var config = {
      authKey: "email",
      recoverable: false
    };
    this.authKey = function(name) {
      config.authKey = name;
    };
    this.enableRecovery = function() {
      config.recoverable = true;
    };
    this.$get = [function authKey() {
      return config;
    }];
  }
  var $__default = authConfig;
  Object.defineProperty(authConfig, "annotations", {get: function() {
      return [new Module('auth.config'), new Provider('authConfig')];
    }});
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../src/app/auth/confirmations/confirmationsStates.js", [], function() {
  "use strict";
  var __moduleName = "../../src/app/auth/confirmations/confirmationsStates.js";
  var State = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/stateInjector.js").State;
  var LoggedInOnlyState = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/stateClasses.js").LoggedInOnlyState;
  var ConfirmationsSuccessState = function ConfirmationsSuccessState() {
    $traceurRuntime.superConstructor($ConfirmationsSuccessState).call(this);
    this.url = '^/confirmed';
    this.templateUrl = 'auth/confirmations/confirmations-success.tpl.html';
  };
  var $ConfirmationsSuccessState = ConfirmationsSuccessState;
  ($traceurRuntime.createClass)(ConfirmationsSuccessState, {}, {}, LoggedInOnlyState);
  Object.defineProperty(ConfirmationsSuccessState, "annotations", {get: function() {
      return [new State('root.inner.confirmationsSuccess')];
    }});
  return {get ConfirmationsSuccessState() {
      return ConfirmationsSuccessState;
    }};
});
System.registerModule("../../src/app/auth/confirmations/confirmations.js", [], function() {
  "use strict";
  var __moduleName = "../../src/app/auth/confirmations/confirmations.js";
  var Module = System.get("../../node_modules/a1atscript/src/a1atscript.js").Module;
  var ConfirmationsStates = System.get("../../src/app/auth/confirmations/confirmationsStates.js");
  var confirmations = new Module('auth.confirmations', ['ui.router.state', 'ng-token-auth', ConfirmationsStates]);
  var $__default = confirmations;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../src/app/auth/passwords/passwordsControllers.js", [], function() {
  "use strict";
  var __moduleName = "../../src/app/auth/passwords/passwordsControllers.js";
  var Controller = System.get("../../node_modules/a1atscript/src/a1atscript.js").Controller;
  function PasswordsRequestController($scope, $auth, $state, $xngToast, Serializer) {
    $scope.passwordRequest = {email: ''};
    $scope.passwordRequestSubmit = function() {
      var serializer = new Serializer();
      $auth.requestPasswordReset(serializer.serialize({
        user: $scope.passwordRequest,
        update_url: $state.href("^.passwordsUpdate")
      })).then(function(resp) {
        $state.go('root.inner.passwordsRequestSuccess');
      }).catch(function(resp) {
        $xngToast.errorList(resp.data.errors);
      });
    };
  }
  Object.defineProperty(PasswordsRequestController, "annotations", {get: function() {
      return [new Controller('PasswordsRequestCtrl', ['$scope', '$auth', '$state', '$xngToast', 'Serializer'])];
    }});
  function PasswordsUpdateController($scope, $auth, $state, $xngToast, $location, Serializer) {
    $scope.passwordUpdate = {
      password: '',
      passwordConfirmation: ''
    };
    $scope.passwordUpdateSubmit = function() {
      var serializer = new Serializer();
      var query = $location.search();
      query["user"] = $scope.passwordUpdate;
      $auth.updatePassword(serializer.serialize(query)).then(function(resp) {
        $state.go('root.inner.passwordsUpdateSuccess');
      }).catch(function(resp) {
        $xngToast.errorList(resp.data.errors, "We could not update your password because:");
      });
    };
  }
  Object.defineProperty(PasswordsUpdateController, "annotations", {get: function() {
      return [new Controller('PasswordsUpdateCtrl', ['$scope', '$auth', '$state', '$xngToast', '$location', 'Serializer'])];
    }});
  return {
    get PasswordsRequestController() {
      return PasswordsRequestController;
    },
    get PasswordsUpdateController() {
      return PasswordsUpdateController;
    }
  };
});
System.registerModule("../../src/app/auth/passwords/passwordsStates.js", [], function() {
  "use strict";
  var __moduleName = "../../src/app/auth/passwords/passwordsStates.js";
  var $__0 = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/stateInjector.js"),
      State = $__0.State,
      Resolve = $__0.Resolve;
  var LoggedInOnlyState = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/stateClasses.js").LoggedInOnlyState;
  var PasswordsRequestState = function PasswordsRequestState() {
    this.url = '^/reset-password';
    this.controller = 'PasswordsRequestCtrl';
    this.templateUrl = 'auth/passwords/passwords-request.tpl.html';
  };
  ($traceurRuntime.createClass)(PasswordsRequestState, {}, {});
  Object.defineProperty(PasswordsRequestState, "annotations", {get: function() {
      return [new State('root.inner.passwordsRequest')];
    }});
  var PasswordsRequestSuccessState = function PasswordsRequestSuccessState() {
    this.url = '^/reset-password-sent';
    this.templateUrl = 'auth/passwords/passwords-request-success.tpl.html';
  };
  ($traceurRuntime.createClass)(PasswordsRequestSuccessState, {}, {});
  Object.defineProperty(PasswordsRequestSuccessState, "annotations", {get: function() {
      return [new State('root.inner.passwordsRequestSuccess')];
    }});
  var PasswordsUpdateState = function PasswordsUpdateState() {
    $traceurRuntime.superConstructor($PasswordsUpdateState).call(this);
    this.url = '^/update-password';
    this.controller = 'PasswordsUpdateCtrl';
    this.templateUrl = 'auth/passwords/passwords-update.tpl.html';
  };
  var $PasswordsUpdateState = PasswordsUpdateState;
  ($traceurRuntime.createClass)(PasswordsUpdateState, {}, {}, LoggedInOnlyState);
  Object.defineProperty(PasswordsUpdateState, "annotations", {get: function() {
      return [new State('root.inner.passwordsUpdate')];
    }});
  var PasswordsUpdateSuccessState = function PasswordsUpdateSuccessState() {
    $traceurRuntime.superConstructor($PasswordsUpdateSuccessState).call(this);
    this.url = '^/updated-password';
    this.templateUrl = 'auth/passwords/passwords-update-success.tpl.html';
  };
  var $PasswordsUpdateSuccessState = PasswordsUpdateSuccessState;
  ($traceurRuntime.createClass)(PasswordsUpdateSuccessState, {}, {}, LoggedInOnlyState);
  Object.defineProperty(PasswordsUpdateSuccessState, "annotations", {get: function() {
      return [new State('root.inner.passwordsUpdateSuccess')];
    }});
  return {
    get PasswordsRequestState() {
      return PasswordsRequestState;
    },
    get PasswordsRequestSuccessState() {
      return PasswordsRequestSuccessState;
    },
    get PasswordsUpdateState() {
      return PasswordsUpdateState;
    },
    get PasswordsUpdateSuccessState() {
      return PasswordsUpdateSuccessState;
    }
  };
});
System.registerModule("../../src/app/auth/passwords/passwords.js", [], function() {
  "use strict";
  var __moduleName = "../../src/app/auth/passwords/passwords.js";
  var Module = System.get("../../node_modules/a1atscript/src/a1atscript.js").Module;
  var PasswordsStates = System.get("../../src/app/auth/passwords/passwordsStates.js");
  var PasswordsControllers = System.get("../../src/app/auth/passwords/passwordsControllers.js");
  var passwords = new Module('auth.passwords', ['ui.router.state', 'ng-token-auth', PasswordsStates, PasswordsControllers]);
  var $__default = passwords;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../src/app/auth/registrations/registrationsControllers.js", [], function() {
  "use strict";
  var __moduleName = "../../src/app/auth/registrations/registrationsControllers.js";
  var Controller = System.get("../../node_modules/a1atscript/src/a1atscript.js").Controller;
  function RegistrationsController($scope, $auth, $state, $xngToast, Serializer) {
    $scope.registration = {
      email: '',
      emailConfirmation: '',
      password: '',
      passwordConfirmation: ''
    };
    $scope.registrationSubmit = function() {
      var serializer = new Serializer();
      $auth.submitRegistration(serializer.serialize({user: $scope.registration})).then(function(resp) {
        $state.go('root.inner.registrationsSuccess');
      }).catch(function(resp) {
        $xngToast.errorList(resp.data.errors, "We cannot process your registration because:");
      });
    };
  }
  var $__default = RegistrationsController;
  Object.defineProperty(RegistrationsController, "annotations", {get: function() {
      return [new Controller('RegistrationsCtrl', ['$scope', '$auth', '$state', '$xngToast', 'Serializer'])];
    }});
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../src/app/auth/registrations/registrationsStates.js", [], function() {
  "use strict";
  var __moduleName = "../../src/app/auth/registrations/registrationsStates.js";
  var State = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/stateInjector.js").State;
  var RegistrationsState = function RegistrationsState() {
    this.url = '^/sign-up';
    this.controller = 'RegistrationsCtrl';
    this.templateUrl = 'auth/registrations/registrations.tpl.html';
  };
  ($traceurRuntime.createClass)(RegistrationsState, {}, {});
  Object.defineProperty(RegistrationsState, "annotations", {get: function() {
      return [new State('root.inner.registrations')];
    }});
  var RegistrationsSuccessState = function RegistrationsSuccessState() {
    this.url = '^/signed-up';
    this.templateUrl = 'auth/registrations/registrations-success.tpl.html';
  };
  ($traceurRuntime.createClass)(RegistrationsSuccessState, {}, {});
  Object.defineProperty(RegistrationsSuccessState, "annotations", {get: function() {
      return [new State('root.inner.registrationsSuccess')];
    }});
  return {
    get RegistrationsState() {
      return RegistrationsState;
    },
    get RegistrationsSuccessState() {
      return RegistrationsSuccessState;
    }
  };
});
System.registerModule("../../src/app/auth/registrations/registrations.js", [], function() {
  "use strict";
  var __moduleName = "../../src/app/auth/registrations/registrations.js";
  var Module = System.get("../../node_modules/a1atscript/src/a1atscript.js").Module;
  var $__1 = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils.js"),
      Toast = $__1.Toast,
      Serializer = $__1.Serializer;
  var RegistrationsStates = System.get("../../src/app/auth/registrations/registrationsStates.js");
  var RegistrationsController = System.get("../../src/app/auth/registrations/registrationsControllers.js").default;
  var registrations = new Module('auth.registrations', ['ui.router.state', 'ng-token-auth', Toast, Serializer, RegistrationsStates, RegistrationsController]);
  var $__default = registrations;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../src/app/auth/sessions/sessionsControllers.js", [], function() {
  "use strict";
  var __moduleName = "../../src/app/auth/sessions/sessionsControllers.js";
  var Controller = System.get("../../node_modules/a1atscript/src/a1atscript.js").Controller;
  function SessionsController($scope, $auth, $state, $xngToast, Serializer, authConfig, Inflector) {
    $scope.session = {password: ''};
    $scope.session[authConfig.authKey] = '';
    $scope.authKey = authConfig.authKey;
    $scope.humanAuthKey = Inflector.humanize(authConfig.authKey);
    $scope.passwordShow = authConfig.recoverable;
    $scope.sessionSubmit = function() {
      var serializer = new Serializer();
      $auth.submitLogin(serializer.serialize({user: $scope.session})).then(function(resp) {
        $state.go('root.inner.sessionsSuccess');
      }).catch(function(resp) {
        $xngToast.error(resp.errors);
      });
    };
  }
  var $__default = SessionsController;
  Object.defineProperty(SessionsController, "annotations", {get: function() {
      return [new Controller('SessionsCtrl', ['$scope', '$auth', '$state', '$xngToast', 'Serializer', 'authConfig', 'Inflector'])];
    }});
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../src/app/auth/sessions/sessionsStates.js", [], function() {
  "use strict";
  var __moduleName = "../../src/app/auth/sessions/sessionsStates.js";
  var $__0 = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/stateInjector.js"),
      State = $__0.State,
      Resolve = $__0.Resolve;
  var LoggedInOnlyState = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/stateClasses.js").LoggedInOnlyState;
  var SessionsState = function SessionsState() {
    this.url = '^/sign-in';
    this.controller = 'SessionsCtrl';
    this.templateUrl = 'auth/sessions/sessions.tpl.html';
  };
  ($traceurRuntime.createClass)(SessionsState, {}, {});
  Object.defineProperty(SessionsState, "annotations", {get: function() {
      return [new State('root.inner.sessions')];
    }});
  var SessionsSuccessState = function SessionsSuccessState() {
    $traceurRuntime.superConstructor($SessionsSuccessState).call(this);
    this.url = '^/signed-in';
    this.templateUrl = 'auth/sessions/sessions-success.tpl.html';
  };
  var $SessionsSuccessState = SessionsSuccessState;
  ($traceurRuntime.createClass)(SessionsSuccessState, {}, {}, LoggedInOnlyState);
  Object.defineProperty(SessionsSuccessState, "annotations", {get: function() {
      return [new State('root.inner.sessionsSuccess')];
    }});
  return {
    get SessionsState() {
      return SessionsState;
    },
    get SessionsSuccessState() {
      return SessionsSuccessState;
    }
  };
});
System.registerModule("../../src/app/auth/sessions/sessions.js", [], function() {
  "use strict";
  var __moduleName = "../../src/app/auth/sessions/sessions.js";
  var Module = System.get("../../node_modules/a1atscript/src/a1atscript.js").Module;
  var $__1 = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils.js"),
      Toast = $__1.Toast,
      Serializer = $__1.Serializer;
  var Inflector = System.get("../../node_modules/xing-inflector/dist/xing-inflector.js").default;
  var Config = System.get("../../src/app/auth/config.js").default;
  var SessionsStates = System.get("../../src/app/auth/sessions/sessionsStates.js");
  var SessionsController = System.get("../../src/app/auth/sessions/sessionsControllers.js").default;
  var sessions = new Module('auth.sessions', ['ui.router.state', 'ng-token-auth', Toast, Inflector, Serializer, Config, SessionsStates, SessionsController]);
  var $__default = sessions;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../src/common/environment.js", [], function() {
  "use strict";
  var __moduleName = "../../src/common/environment.js";
  var environment = {
    backendUrl: 'http://localhost:3000/',
    name: "development"
  };
  return {get environment() {
      return environment;
    }};
});
System.registerModule("../../src/common/config.js", [], function() {
  "use strict";
  var __moduleName = "../../src/common/config.js";
  var environment = System.get("../../src/common/environment.js").environment;
  var backendUrl = (function() {
    var cookies = [];
    if (document.cookie) {
      cookies = document.cookie.split(/;\s*/);
    }
    var matches = cookies.filter((function(cookie) {
      return /^xingBackendUrl=/.test(cookie);
    }));
    if (matches.length > 0) {
      return matches[0].split('=')[1];
    } else {
      return environment.backendUrl;
    }
  }());
  var appName = "XingWebsite";
  var configuration = {
    backendUrl: backendUrl,
    appName: appName
  };
  if (environment.name) {
    configuration.appTitle = (configuration.appName + " - " + environment.name);
  } else {
    configuration.appTitle = configuration.appName;
  }
  return {
    get backendUrl() {
      return backendUrl;
    },
    get appName() {
      return appName;
    },
    get configuration() {
      return configuration;
    }
  };
});
System.registerModule("../../src/app/auth/auth.js", [], function() {
  "use strict";
  var __moduleName = "../../src/app/auth/auth.js";
  var backendUrl = System.get("../../src/common/config.js").backendUrl;
  var Sessions = System.get("../../src/app/auth/sessions/sessions.js").default;
  var Registrations = System.get("../../src/app/auth/registrations/registrations.js").default;
  var Confirmations = System.get("../../src/app/auth/confirmations/confirmations.js").default;
  var Passwords = System.get("../../src/app/auth/passwords/passwords.js").default;
  var AuthConfig = System.get("../../src/app/auth/config.js").default;
  var $__6 = System.get("../../node_modules/a1atscript/src/a1atscript.js"),
      Config = $__6.Config,
      Module = $__6.Module;
  function authSetup($authProvider, authConfigProvider) {
    var location = window.location.href;
    var confirmationLocation = new URL(location);
    confirmationLocation.pathname = "/confirmed";
    confirmationLocation.search = "";
    var passwordResetSuccessLocation = new URL(location);
    passwordResetSuccessLocation.pathname = "/update-password";
    passwordResetSuccessLocation.search = "";
    var storageType = 'localStorage';
    try {
      localStorage.setItem("mod", "mod");
      localStorage.removeItem("mod");
    } catch (e) {
      storageType = 'cookies';
    }
    $authProvider.configure({
      apiUrl: backendUrl,
      tokenValidationPath: 'users/validate_token',
      signOutUrl: 'users/sign_out',
      emailRegistrationPath: 'users',
      accountUpdatePath: 'users',
      accountDeletePath: 'users',
      passwordResetPath: 'users/password',
      passwordUpdatePath: 'users/password',
      emailSignInPath: 'users/sign_in',
      storage: storageType,
      confirmationSuccessUrl: confirmationLocation.toString(),
      passwordResetSuccessUrl: passwordResetSuccessLocation.toString()
    });
    authConfigProvider.authKey("email");
    authConfigProvider.enableRecovery();
  }
  Object.defineProperty(authSetup, "annotations", {get: function() {
      return [new Config('$authProvider', 'authConfigProvider')];
    }});
  var authModule = new Module('auth', ['ng-token-auth', Sessions, Registrations, Confirmations, Passwords, AuthConfig, authSetup]);
  var $__default = authModule;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../src/app/homepage/homepageControllers.js", [], function() {
  "use strict";
  var __moduleName = "../../src/app/homepage/homepageControllers.js";
  var Controller = System.get("../../node_modules/a1atscript/src/a1atscript.js").Controller;
  function HomepageShowController() {}
  Object.defineProperty(HomepageShowController, "annotations", {get: function() {
      return [new Controller('HomepageShowCtrl', [])];
    }});
  function HomepageController() {}
  Object.defineProperty(HomepageController, "annotations", {get: function() {
      return [new Controller('HomepageCtrl', [])];
    }});
  return {
    get HomepageShowController() {
      return HomepageShowController;
    },
    get HomepageController() {
      return HomepageController;
    }
  };
});
System.registerModule("../../src/app/homepage/homepageStates.js", [], function() {
  "use strict";
  var __moduleName = "../../src/app/homepage/homepageStates.js";
  var $__0 = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/stateInjector.js"),
      State = $__0.State,
      Resolve = $__0.Resolve;
  var $__1 = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/stateClasses.js"),
      AdminOnlyState = $__1.AdminOnlyState,
      TrackAdminState = $__1.TrackAdminState;
  var HomepageState = function HomepageState() {
    $traceurRuntime.superConstructor($HomepageState).call(this);
    this.controller = 'HomepageCtrl';
    this.templateUrl = 'homepage/homepage.tpl.html';
    this.abstract = true;
    this.url = 'home';
  };
  var $HomepageState = HomepageState;
  ($traceurRuntime.createClass)(HomepageState, {}, {}, TrackAdminState);
  Object.defineProperty(HomepageState, "annotations", {get: function() {
      return [new State('root.homepage')];
    }});
  var HomepageShowState = function HomepageShowState() {
    this.url = '';
    this.controller = 'HomepageShowCtrl';
    this.templateUrl = 'homepage/homepage-show.tpl.html';
  };
  ($traceurRuntime.createClass)(HomepageShowState, {}, {});
  Object.defineProperty(HomepageShowState, "annotations", {get: function() {
      return [new State('root.homepage.show')];
    }});
  return {
    get HomepageState() {
      return HomepageState;
    },
    get HomepageShowState() {
      return HomepageShowState;
    }
  };
});
System.registerModule("../../src/app/homepage/homepage.js", [], function() {
  "use strict";
  var __moduleName = "../../src/app/homepage/homepage.js";
  var Module = System.get("../../node_modules/a1atscript/src/a1atscript.js").Module;
  var HomepageControllers = System.get("../../src/app/homepage/homepageControllers.js");
  var HomepageStates = System.get("../../src/app/homepage/homepageStates.js");
  var Homepage = new Module('homepage', [HomepageControllers, HomepageStates]);
  var $__default = Homepage;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../src/app/rootController.js", [], function() {
  "use strict";
  var __moduleName = "../../src/app/rootController.js";
  var Controller = System.get("../../node_modules/a1atscript/src/a1atscript.js").Controller;
  function RootCtrl($scope, $state, $rootScope, $window) {
    $rootScope.$on("$viewContentLoaded", function(event) {
      $window.frontendContentLoaded = true;
    });
  }
  var $__default = RootCtrl;
  Object.defineProperty(RootCtrl, "annotations", {get: function() {
      return [new Controller('RootCtrl', ['$scope', '$state', '$rootScope', '$window'])];
    }});
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../src/app/rootStates.js", [], function() {
  "use strict";
  var __moduleName = "../../src/app/rootStates.js";
  var State = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils/stateInjector.js").State;
  var RootState = function RootState() {
    this.templateUrl = "root.tpl.html";
    this.controller = 'RootCtrl';
    this.abstract = true;
    this.url = "/";
  };
  ($traceurRuntime.createClass)(RootState, {}, {});
  Object.defineProperty(RootState, "annotations", {get: function() {
      return [new State('root')];
    }});
  var RootInnerState = function RootInnerState() {
    this.templateUrl = "inner.tpl.html";
    this.abstract = true;
    this.url = "inner";
  };
  ($traceurRuntime.createClass)(RootInnerState, {}, {});
  Object.defineProperty(RootInnerState, "annotations", {get: function() {
      return [new State('root.inner')];
    }});
  return {
    get RootState() {
      return RootState;
    },
    get RootInnerState() {
      return RootInnerState;
    }
  };
});
System.registerModule("../../build/templates-app.js", [], function() {
  "use strict";
  var __moduleName = "../../build/templates-app.js";
  angular.module('templates-app', ['auth/confirmations/confirmations-success.tpl.html', 'auth/passwords/passwords-request-success.tpl.html', 'auth/passwords/passwords-request.tpl.html', 'auth/passwords/passwords-update-success.tpl.html', 'auth/passwords/passwords-update.tpl.html', 'auth/registrations/registrations-success.tpl.html', 'auth/registrations/registrations.tpl.html', 'auth/sessions/sessions-success.tpl.html', 'auth/sessions/sessions.tpl.html', 'homepage/homepage-show.tpl.html', 'homepage/homepage.tpl.html', 'inner.tpl.html', 'root.tpl.html']);
  angular.module("auth/confirmations/confirmations-success.tpl.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("auth/confirmations/confirmations-success.tpl.html", "<h2>Your email address has been successfully confirmed.</h2>");
  }]);
  angular.module("auth/passwords/passwords-request-success.tpl.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("auth/passwords/passwords-request-success.tpl.html", "<h1>Password reset email sent!</h1>\n" + "\n" + "<p>Please check your email.  Within a few minutes you receive an email with instructions on how to reset your password.</p>\n" + "");
  }]);
  angular.module("auth/passwords/passwords-request.tpl.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("auth/passwords/passwords-request.tpl.html", "<h1>Forgot your password?</h1>\n" + "\n" + "<p>Enter your email address below to receive a new confirmation email.</p>\n" + "\n" + "<form id='passwords-request-form'>\n" + "    <div class='xng-form-row'>\n" + "      <label for=\"email\">Email:</label>\n" + "      <input name=\"email\" ng-model=\"passwordRequest.email\" placeholder=\"Email\" />\n" + "      <span class='comment'></span>\n" + "    </div>\n" + "\n" + "    <div class='xng-form-row'>\n" + "      <button type=\"submit\" ng-click=\"passwordRequestSubmit()\" class=\"call-to-action\">Send password reset instructions</button>\n" + "    </div>\n" + "\n" + "</form>\n" + "");
  }]);
  angular.module("auth/passwords/passwords-update-success.tpl.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("auth/passwords/passwords-update-success.tpl.html", "<h1>Password Updated</h1>\n" + "\n" + "<p>Your password has been changed successfully.</p>\n" + "");
  }]);
  angular.module("auth/passwords/passwords-update.tpl.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("auth/passwords/passwords-update.tpl.html", "<h1>Reset Your Password</h1>\n" + "\n" + "<form id='passwords-update-form'>\n" + "\n" + "    <div class='xng-form-row'>\n" + "      <label for=\"password\">New Password:</label>\n" + "      <input type=\"password\" name=\"password\" ng-model=\"passwordUpdate.password\" placeholder=\"New Password\" />\n" + "      <span class='comment'></span>\n" + "    </div>\n" + "\n" + "    <div class='xng-form-row'>\n" + "      <label for=\"password-confirmation\">Confirm New Password:</label>\n" + "      <input type=\"password\" name=\"password-confirmation\" ng-model=\"passwordUpdate.passwordConfirmation\" placeholder=\"New Password\" />\n" + "      <span class='comment'></span>\n" + "    </div>\n" + "\n" + "    <div class='xng-form-row'>\n" + "      <button type=\"submit\" ng-click=\"passwordUpdateSubmit()\" class='call-to-action'>Update Password</button>\n" + "    </div>\n" + "\n" + "</form>\n" + "");
  }]);
  angular.module("auth/registrations/registrations-success.tpl.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("auth/registrations/registrations-success.tpl.html", "<h2>A message with a confirmation link has been sent to your email address. Please follow the link to activate your account.</h2>");
  }]);
  angular.module("auth/registrations/registrations.tpl.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("auth/registrations/registrations.tpl.html", "<h1>Sign Up</h1>\n" + "\n" + "<form id='registrations-form'>\n" + "\n" + "    <div class='xng-form-row'>\n" + "      <label for=\"email\">Email:</label>\n" + "      <input name=\"email\" ng-model=\"registration.email\" placeholder=\"Email\" />\n" + "      <span class='comment'></span>\n" + "    </div>\n" + "\n" + "    <div class='xng-form-row'>\n" + "      <label for=\"email-confirmation\">Email Confirmation:</label>\n" + "      <input name=\"email-confirmation\" ng-model=\"registration.emailConfirmation\" placeholder=\"Email Confirmation\" />\n" + "      <span class='comment'></span>\n" + "    </div>\n" + "\n" + "    <div class='xng-form-row'>\n" + "      <label for=\"password\">Password:</label>\n" + "      <input type=\"password\" name=\"password\" ng-model=\"registration.password\" placeholder=\"Password\" />\n" + "      <span class='comment'></span>\n" + "    </div>\n" + "\n" + "    <div class='xng-form-row'>\n" + "      <label for=\"password-confirmation\">Password Confirmation:</label>\n" + "      <input type=\"password\" name=\"password-confirmation\" ng-model=\"registration.passwordConfirmation\" placeholder=\"Password Confirmation\" />\n" + "      <span class='comment'></span>\n" + "    </div>\n" + "\n" + "    <div class='xng-form-row'>\n" + "      <button type=\"submit\" ng-click=\"registrationSubmit()\" class='call-to-action'>Sign Up</button>\n" + "    </div>\n" + "\n" + "    <div class='xng-form-row'>\n" + "      <a ui-sref='root.inner.sessions'  class='input-like'>Already have an account?</a>\n" + "    </div>\n" + "\n" + "</form>\n" + "");
  }]);
  angular.module("auth/sessions/sessions-success.tpl.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("auth/sessions/sessions-success.tpl.html", "<h1>You have successfully logged in!</h1>");
  }]);
  angular.module("auth/sessions/sessions.tpl.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("auth/sessions/sessions.tpl.html", "<h1>Sign In</h1>\n" + "\n" + "<form id='sessions-form'>\n" + "    <div class='xng-form-row'>\n" + "      <label for=\"{{authKey}}\">{{humanAuthKey}}:</label>\n" + "      <input name=\"{{authKey}}\" ng-model=\"session[authKey]\" placeholder=\"{{humanAuthKey}}\" required />\n" + "      <span class='messages'></span>\n" + "    </div>\n" + "\n" + "    <div class='xng-form-row'>\n" + "      <label for=\"password\">Password:</label>\n" + "      <input type=\"password\" name=\"password\" ng-model=\"session.password\" placeholder=\"Password\" required />\n" + "      <span class='messages'></span>\n" + "    </div>\n" + "\n" + "    <div class='xng-form-row'>\n" + "      <button type=\"submit\" ng-click=\"sessionSubmit()\" class=\"call-to-action\">Sign In</button>\n" + "    </div>\n" + "\n" + "    <div class='xng-form-row'>\n" + "      <div ng-if=\"passwordShow\" class='input-like'>\n" + "        <a ui-sref='root.inner.passwordsRequest'>Forgot your password?</a>\n" + "      </div>\n" + "    </div>\n" + "</form>\n" + "");
  }]);
  angular.module("homepage/homepage-show.tpl.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("homepage/homepage-show.tpl.html", "<h1>Xing Homepage</h1>\n" + "<p>This will be the home page of whatever project is based on Xing.</p>\n" + "");
  }]);
  angular.module("homepage/homepage.tpl.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("homepage/homepage.tpl.html", "<xng-responsive-menu>\n" + "  <a ui-sref='root.inner.homepage'>Homepage</a>\n" + "  <xng-session-links>\n" + "  </xng-session-links>\n" + "</xng-responsive-menu>\n" + "\n" + "<ui-view xng-state-attrs></ui-view>\n" + "\n" + "<footer>\n" + "  <span id=\"copyright\">&copy; 2016 Your Organization Here</span>\n" + "  <a ui-sref='root.inner.sessions' id='sign-in-link'>Sign In</a>\n" + "  <a href='#' xng-unimplemented>Demo Unimplemented Feature</a>\n" + "</footer>\n" + "");
  }]);
  angular.module("inner.tpl.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("inner.tpl.html", "<xng-responsive-menu>\n" + "  <xng-navbar id=\"main_nav\" menu=\"mainMenu\">\n" + "  </xng-navbar>\n" + "  <xng-session-links>\n" + "  </xng-session-links>\n" + "</xng-responsive-menu>\n" + "\n" + "<div id=\"toast_main\">\n" + "</div>\n" + "\n" + "<ui-view xng-state-attrs></ui-view>\n" + "\n" + "<footer>\n" + "  <span id=\"copyright\">&copy; 2016 Your Organization Here</span>\n" + "  <a ui-sref='root.inner.sessions' id='sign-in-link'>Sign In</a>\n" + "</footer>\n" + "");
  }]);
  angular.module("root.tpl.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("root.tpl.html", "<ui-view xng-state-attrs>\n" + "</ui-view>\n" + "");
  }]);
  return {};
});
System.registerModule("../../build/templates-common.js", [], function() {
  "use strict";
  var __moduleName = "../../build/templates-common.js";
  angular.module('templates-common', ['components/adminOnly/admin-only.tpl.html', 'components/sessionLinks/session-links.tpl.html']);
  angular.module("components/adminOnly/admin-only.tpl.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("components/adminOnly/admin-only.tpl.html", "<div ng-if=\"adminOnly.showAdmin\">\n" + "  <div ng-transclude>\n" + "  </div>\n" + "</div>\n" + "");
  }]);
  angular.module("components/sessionLinks/session-links.tpl.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("components/sessionLinks/session-links.tpl.html", "<ul class=\"session-links\">\n" + "  <li ng-hide=\"xngSessionLinks.isLoggedIn\"><a ui-sref='root.inner.registrations'>Sign Up</a></li>\n" + "  <li ng-hide=\"xngSessionLinks.isLoggedIn\"><a ui-sref='root.inner.sessions'>Sign In</a></li>\n" + "  <li ng-show=\"xngSessionLinks.isLoggedIn\"><a xng-sign-out>Sign Out</a></li>\n" + "</ul>\n" + "");
  }]);
  return {};
});
System.registerModule("../../src/common/components/OnLoginDirective/OnLoginDirective.js", [], function() {
  "use strict";
  var __moduleName = "../../src/common/components/OnLoginDirective/OnLoginDirective.js";
  var OnLoginDirective = function OnLoginDirective($rootScope, $auth) {
    var $__0 = this;
    this.$rootScope = $rootScope;
    this.$auth = $auth;
    this.onLogout();
    this.$auth.validateUser().then((function(user) {
      $__0.onLogin(user);
    }));
    this.$rootScope.$on('auth:login-success', (function(ev, user) {
      $__0.onLogin(user);
    }));
    this.$rootScope.$on('auth:logout-success', (function(ev, user) {
      $__0.onLogout();
    }));
  };
  ($traceurRuntime.createClass)(OnLoginDirective, {}, {});
  var $__default = OnLoginDirective;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../src/common/components/signOut/signOut.js", [], function() {
  "use strict";
  var __moduleName = "../../src/common/components/signOut/signOut.js";
  var $__0 = System.get("../../node_modules/a1atscript/src/a1atscript.js"),
      Module = $__0.Module,
      DirectiveObject = $__0.DirectiveObject;
  var SignOut = function SignOut($state, $auth) {
    this.$state = $state;
    this.$auth = $auth;
    this.restrict = 'A';
  };
  ($traceurRuntime.createClass)(SignOut, {link: function(scope, element, attrs) {
      var $__1 = this;
      element.on('click', (function() {
        $__1.$auth.signOut().then((function(response) {
          $__1.$state.go('root.homepage.show');
        }));
      }));
    }}, {});
  var $__default = SignOut;
  Object.defineProperty(SignOut, "annotations", {get: function() {
      return [new Module('signOutDirective', ['ng-token-auth', 'ui.router.state']), new DirectiveObject('xngSignOut', ['$state', '$auth'])];
    }});
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../src/common/components/sessionLinks/sessionLinks.js", [], function() {
  "use strict";
  var __moduleName = "../../src/common/components/sessionLinks/sessionLinks.js";
  var SignOut = System.get("../../src/common/components/signOut/signOut.js").default;
  var $__1 = System.get("../../node_modules/a1atscript/src/a1atscript.js"),
      Module = $__1.Module,
      Component = $__1.Component,
      Template = $__1.Template;
  var OnLoginDirective = System.get("../../src/common/components/OnLoginDirective/OnLoginDirective.js").default;
  var SessionLinks = function SessionLinks() {
    $traceurRuntime.superConstructor($SessionLinks).apply(this, arguments);
    ;
  };
  var $SessionLinks = SessionLinks;
  ($traceurRuntime.createClass)(SessionLinks, {
    onLogin: function(user) {
      this.isLoggedIn = true;
    },
    onLogout: function() {
      this.isLoggedIn = false;
    }
  }, {}, OnLoginDirective);
  var $__default = SessionLinks;
  Object.defineProperty(SessionLinks, "annotations", {get: function() {
      return [new Module('sessionLinks', ['ng-token-auth', SignOut]), new Component({
        selector: 'xngSessionLinks',
        services: ['$rootScope', '$auth']
      }), new Template({url: 'components/sessionLinks/session-links.tpl.html'})];
    }});
  return {get default() {
      return $__default;
    }};
});
System.registerModule("../../src/app/app.js", [], function() {
  "use strict";
  var __moduleName = "../../src/app/app.js";
  var appName = System.get("../../src/common/config.js").appName;
  System.get("../../build/templates-app.js");
  System.get("../../build/templates-common.js");
  var $__1 = System.get("../../node_modules/a1atscript/src/a1atscript.js"),
      Module = $__1.Module,
      Injector = $__1.Injector;
  var SessionLinks = System.get("../../src/common/components/sessionLinks/sessionLinks.js").default;
  var $__3 = System.get("../../node_modules/xing-frontend-utils/src/xing-frontend-utils.js"),
      Fallback = $__3.Fallback,
      Toast = $__3.Toast,
      ResponsiveMenu = $__3.ResponsiveMenu,
      UnimplementedDirective = $__3.UnimplementedDirective,
      StateAttrs = $__3.StateAttrs,
      uiRouteLogger = $__3.uiRouteLogger,
      stateFallback = $__3.stateFallback,
      ExampleForm = $__3.ExampleForm;
  var appConfig = System.get("../../src/app/appConfig.js").default;
  var Auth = System.get("../../src/app/auth/auth.js").default;
  var Homepage = System.get("../../src/app/homepage/homepage.js").default;
  var RootStates = System.get("../../src/app/rootStates.js");
  var RootCtrl = System.get("../../src/app/rootController.js").default;
  var app = new Module(appName, ['templates-app', 'templates-common', 'ui.router', 'picardy.fontawesome', StateAttrs, uiRouteLogger, stateFallback, Homepage, Auth, Fallback, ResponsiveMenu, UnimplementedDirective, ExampleForm, SessionLinks, Toast, appConfig, RootStates, RootCtrl]);
  var injector = new Injector(appName);
  injector.instantiate(app);
  return {};
});
System.get("../../src/app/app.js" + '');
//# sourceMappingURL=XingWebsite-0.0.1.js.map
