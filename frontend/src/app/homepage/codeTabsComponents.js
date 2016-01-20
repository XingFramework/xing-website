import {Component, View, Directive, applyAnnotation} from "a1atscript"

@Component({
  selector: 'code-tabs',
  transclude: true
})
@View({
  template: `
    <div class="code-box">
      <header class="code-box-header">
        <nav class="code-box-nav">
          <div ng-repeat="pane in codeTabs.panes" ng-click="codeTabs.showPane(pane)" class="tab" ng-class="{selected:pane.selected}">
            {{pane.name}}
          </div>
        </nav>
      </header>
      <div class="code-box-examples" ng-transclude></div>
    </div>
  `
})
export class CodeTabs {
  constructor() {
    this.panes = []
  }

  addPane(pane) {
    if (this.panes.length === 0) {
      this.showPane(pane);
    }

    this.panes.push(pane);
  }

  showPane(pane) {
    this.panes.forEach((pane) => {
      pane.selected = false;
    });

    pane.selected = true;
  }
}

export function codePane() {
  return {
    require: '^codeTabs',
    restrict: 'E',
    scope: true,

    compile: function(tElement, tAttrs) {
      var html = (tAttrs.escape === "html") ? _.escape(tElement.html()) : tElement.html();
      var template =  '<pre ng-show="selected" >' +
                      '<code class="'+ tAttrs.format + ' ' + tAttrs.language + '" ng-non-bindable>' + html + '</code>' +
                      '</pre>';


      // UPDATE ELEMENT WITH NEW TEMPLATE
      tElement.html(template);


      // RETURN LINK METHOD
      return function(scope, element, attrs, controller) {
        scope.name = attrs.name;

        //ADD PANE TO CONTROLLER
        controller.addPane(scope);
      };
    }
  };
}

applyAnnotation(codePane, Directive, 'codePane')
