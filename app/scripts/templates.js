module.exports = function(Handlebars) {

this["JST"] = this["JST"] || {};

Handlebars.registerPartial("browse", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "      <div class=\"preview-panel\">\n        <div class=\"panel\">\n          <div class=\"preview\"></div>\n        </div>\n      </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class='tab-pane' id=\"browse-tab\">\n  <div class=\"browse-panels\">\n    <div class=\"tree-panel\">\n      <div class=\"header-col\">\n        <select class=\"root-items\"></select>\n      </div>\n      <div class=\"panel\">\n        <ul class=\"tree\"></ul>\n      </div>\n    </div>\n\n    <div class=\"list-panel\">\n      <div class=\"header-col\">\n        <ul class=\"breadcrumb breadcrumb-list\"></ul>\n        <div class=\"options-dropdown\"></div>\n      </div>\n      <div class=\"panel right-panel\">\n        <div class=\"list\"></div>\n      </div>\n    </div>\n"
    + ((stack1 = Handlebars.r(helpers,'if').call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? Handlebars.r(depth0,'has_preview') : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n  </div>\n</div>\n";
},"useData":true}));

Handlebars.registerPartial("search", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class='tab-pane' id=\"search-tab\">\n  <form>\n    <div class=\"search-panels\">\n      <div class=\"search-panel\">\n        <div class=\"header-col\">\n          <select class=\"search-root-items\"></select>\n        </div>\n        <div class=\"panel left-panel search-left-panel\">\n          <input type=\"text\" class=\"form-control\" value=\"Search params\">\n        </div>\n      </div>\n\n      <div class=\"search-list-panel\">\n        <div class=\"header-col\">\n          <div class=\"form-inline\">\n            <div class=\"input-group\">\n              "
    + container.escapeExpression(Handlebars.r(helpers,'input').call(depth0 != null ? depth0 : (container.nullContext || {}),"searchText",{"name":"input","hash":{"placeholder":"Search...","class":"form-control"},"data":data}))
    + "\n              <span class=\"input-group-btn\">\n                <button type=\"submit\" class=\"btn btn-primary btn-search\">Search</button>\n              </span>\n            </div>\n          </div>\n          <div class=\"options-dropdown\"></div>\n        </div>\n        <div class=\"panel right-panel\">\n          <div class=\"search-list\"></div>\n        </div>\n      </div>\n\n      <div class=\"preview-panel\">\n        <div class=\"panel\">\n          <div class=\"preview\"></div>\n        </div>\n      </div>\n    </div>\n  </form>\n</div>\n";
},"useData":true}));

this["JST"]["breadcrumb_item"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "  "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? Handlebars.r(depth0,'model') : depth0)) != null ? Handlebars.r(stack1,'name') : stack1), depth0))
    + "\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "  <a href=\"#\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? Handlebars.r(depth0,'model') : depth0)) != null ? Handlebars.r(stack1,'name') : stack1), depth0))
    + "</a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = Handlebars.r(helpers,'if').call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? Handlebars.r(depth0,'model') : depth0)) != null ? Handlebars.r(stack1,'last') : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});

this["JST"]["browser"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"modal-dialog\">\n  <div class=\"modal-content\">\n\n    <div class=\"browser-tabs\"></div>\n\n    <div class=\"loader\">\n      <div class=\"content\">\n        <i class=\"loading-ng-icon\"></i>\n        <span>Loading</span>\n      </div>\n    </div>\n\n    <div class=\"modal-footer\">\n      <div class=\"row\">\n        <div class=\"selected-panel col-md-10\">\n          <ul class=\"selected-items clearfix\"></ul>\n          <div class=\"note\"></div>\n        </div>\n        <div class=\"col-md-2\">\n          <button type=\"button\" class=\"btn btn-link action_cancel\" data-dismiss=\"modal\">Cancel</button>\n          <button type=\"button\" class=\"btn btn-primary action_apply green\">Confirm</button>\n        </div>\n      </div>\n    </div>\n\n  </div>\n</div>\n";
},"useData":true});

this["JST"]["list_empty"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "No content.\n";
},"useData":true});

this["JST"]["list_item"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "  <td data-name=\""
    + container.escapeExpression(container.lambda((depth0 != null ? Handlebars.r(depth0,'column_id') : depth0), depth0))
    + "\" "
    + ((stack1 = Handlebars.r(helpers,'unless').call(alias1,(depth0 != null ? Handlebars.r(depth0,'visible') : depth0),{"name":"unless","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n"
    + ((stack1 = Handlebars.r(helpers,'eq').call(alias1,(depth0 != null ? Handlebars.r(depth0,'column_id') : depth0),"name",{"name":"eq","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.program(15, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "  </td>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "class=\"hidden\"";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "      <input type=\"checkbox\" id=\""
    + alias2(Handlebars.r(helpers,'uid').call(alias1,true,{"name":"uid","hash":{},"data":data}))
    + "\" "
    + ((stack1 = Handlebars.r(helpers,'if').call(alias1,((stack1 = (depths[1] != null ? Handlebars.r(depths[1],'model') : depths[1])) != null ? Handlebars.r(stack1,'is_checked') : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = Handlebars.r(helpers,'if').call(alias1,((stack1 = (depths[1] != null ? Handlebars.r(depths[1],'model') : depths[1])) != null ? Handlebars.r(stack1,'is_disabled') : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " />\n      <label for=\""
    + alias2(Handlebars.r(helpers,'uid').call(alias1,false,{"name":"uid","hash":{},"data":data}))
    + "\"></label>\n"
    + ((stack1 = Handlebars.r(helpers,'unless').call(alias1,((stack1 = (depths[1] != null ? Handlebars.r(depths[1],'model') : depths[1])) != null ? Handlebars.r(stack1,'visible') : stack1),{"name":"unless","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = Handlebars.r(helpers,'if').call(alias1,((stack1 = (depths[1] != null ? Handlebars.r(depths[1],'model') : depths[1])) != null ? Handlebars.r(stack1,'can_show_children') : stack1),{"name":"if","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.program(13, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    return " checked=\"checked\" ";
},"7":function(container,depth0,helpers,partials,data) {
    return " disabled=\"disabled\" ";
},"9":function(container,depth0,helpers,partials,data) {
    return "        <i class=\"material-icons\">visibility_off</i>\n";
},"11":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "        <a href=\"#\">"
    + container.escapeExpression(Handlebars.r(helpers,'get_column').call(depth0 != null ? depth0 : (container.nullContext || {}),(depths[1] != null ? Handlebars.r(depths[1],'model') : depths[1]),(depth0 != null ? Handlebars.r(depth0,'column_id') : depth0),{"name":"get_column","hash":{},"data":data}))
    + "</a>\n";
},"13":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "        "
    + container.escapeExpression(Handlebars.r(helpers,'get_column').call(depth0 != null ? depth0 : (container.nullContext || {}),(depths[1] != null ? Handlebars.r(depths[1],'model') : depths[1]),(depth0 != null ? Handlebars.r(depth0,'column_id') : depth0),{"name":"get_column","hash":{},"data":data}))
    + "\n";
},"15":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "      "
    + ((stack1 = Handlebars.r(helpers,'get_column').call(depth0 != null ? depth0 : (container.nullContext || {}),(depths[1] != null ? Handlebars.r(depths[1],'model') : depths[1]),(depth0 != null ? Handlebars.r(depth0,'column_id') : depth0),{"name":"get_column","hash":{},"data":data})) != null ? stack1 : "")
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = Handlebars.r(helpers,'each').call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? Handlebars.r(depth0,'columns') : depth0)) != null ? Handlebars.r(stack1,'models') : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});

this["JST"]["list_options"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "    <li>\n      <input name=\""
    + alias2(alias1((depth0 != null ? Handlebars.r(depth0,'column_id') : depth0), depth0))
    + "\" id=\""
    + alias2(Handlebars.r(helpers,'uid').call(alias3,true,{"name":"uid","hash":{},"data":data}))
    + "\" type=\"checkbox\" class=\"column-check\" data-id=\""
    + alias2(alias1((depth0 != null ? Handlebars.r(depth0,'column_id') : depth0), depth0))
    + "\" autocomplete=\"off\" "
    + ((stack1 = Handlebars.r(helpers,'if').call(alias3,(depth0 != null ? Handlebars.r(depth0,'visible') : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n      <label for=\""
    + alias2(Handlebars.r(helpers,'uid').call(alias3,false,{"name":"uid","hash":{},"data":data}))
    + "\">"
    + alias2(alias1((depth0 != null ? Handlebars.r(depth0,'name') : depth0), depth0))
    + "</label>\n    </li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "checked";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<a data-target=\"#\" role=\"button\" class=\"options-dropdown-toggle\">Table options <i class=\"material-icons\">settings</i></a>\n<ul class=\"options-dropdown-menu\">\n"
    + ((stack1 = Handlebars.r(helpers,'each').call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? Handlebars.r(depth0,'items_for_menu') : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\n";
},"useData":true});

this["JST"]["list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "          <th "
    + ((stack1 = Handlebars.r(helpers,'unless').call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? Handlebars.r(depth0,'visible') : depth0),{"name":"unless","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " data-name=\""
    + alias2(alias1((depth0 != null ? Handlebars.r(depth0,'column_id') : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? Handlebars.r(depth0,'name') : depth0), depth0))
    + "</th>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "class=\"hidden\"";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "\n  <table class=\"items-table\">\n    <thead>\n      <tr>\n"
    + ((stack1 = Handlebars.r(helpers,'each').call(alias1,((stack1 = (depth0 != null ? Handlebars.r(depth0,'columns') : depth0)) != null ? Handlebars.r(stack1,'models') : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </tr>\n      <tr class=\"list-root\"></tr>\n    </thead>\n\n    <tbody class=\"children\"></tbody>\n\n  </table>\n\n  <div class=\"pagination-control-container\">\n    "
    + alias2(Handlebars.r(helpers,'paginate').call(alias1,"listview_collection",{"name":"paginate","hash":{},"data":data}))
    + "\n    "
    + alias2(Handlebars.r(helpers,'pages_selector').call(alias1,"listview_collection",{"name":"pages_selector","hash":{},"data":data}))
    + "\n  </div>\n";
},"useData":true});

this["JST"]["pages_selector"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"pages-selector-container\">\n  "
    + container.escapeExpression(Handlebars.r(helpers,'input').call(depth0 != null ? depth0 : (container.nullContext || {}),"limit",{"name":"input","hash":{"id":(depth0 != null ? Handlebars.r(depth0,'id') : depth0),"class":"pages_selector select-box","collection":(depth0 != null ? Handlebars.r(depth0,'collection') : depth0),"as":"select","for":depth0},"data":data}))
    + "\n</div>\n";
},"useData":true});

this["JST"]["paginator"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {});

  return "\n<div class=\"pagination-container\">\n  <ul class=\"pagination\" data-pagination-id=\""
    + alias1(container.lambda((depth0 != null ? Handlebars.r(depth0,'id') : depth0), depth0))
    + "\">\n    <li class=\""
    + alias1(Handlebars.r(helpers,'when').call(alias2,(depth0 != null ? Handlebars.r(depth0,'prev_disabled') : depth0),{"name":"when","hash":{"then":"disabled"},"data":data}))
    + "\"><a href=\"#\" class=\"prev\">«</a></li>\n"
    + ((stack1 = Handlebars.r(helpers,'each').call(alias2,(depth0 != null ? Handlebars.r(depth0,'pages') : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    <li class=\""
    + alias1(Handlebars.r(helpers,'when').call(alias2,(depth0 != null ? Handlebars.r(depth0,'next_disabled') : depth0),{"name":"when","hash":{"then":"disabled"},"data":data}))
    + "\"><a href=\"#\" class=\"next\">»</a></li>\n  </ul>\n</div>\n\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = Handlebars.r(helpers,'if').call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? Handlebars.r(depth0,'gap') : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.program(5, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "    	  <li class=\"inner gap\"><span>...</span></li>\n";
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.escapeExpression;

  return "        <li class=\"inner "
    + alias1(Handlebars.r(helpers,'active_class_if').call(depth0 != null ? depth0 : (container.nullContext || {}),(depths[1] != null ? Handlebars.r(depths[1],'current_page') : depths[1]),(depth0 != null ? Handlebars.r(depth0,'page') : depth0),{"name":"active_class_if","hash":{},"data":data}))
    + "\"><a href=\"#\">"
    + alias1(container.lambda((depth0 != null ? Handlebars.r(depth0,'page') : depth0), depth0))
    + "</a></li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.blockHelperMissing.call(depth0,container.lambda((depth0 != null ? Handlebars.r(depth0,'show') : depth0), depth0),{"name":"show","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});

this["JST"]["preview"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "  <div class=\"preview-loader\">\n    <i class=\"loading-ng-icon\"></i>\n    <p>Loading</p>\n  </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = Handlebars.r(helpers,'if').call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? Handlebars.r(depth0,'html') : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    "
    + ((stack1 = container.lambda((depth0 != null ? Handlebars.r(depth0,'html') : depth0), depth0)) != null ? stack1 : "")
    + "\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "    This item does not have a preview.\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = Handlebars.r(helpers,'if').call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? Handlebars.r(depth0,'loading') : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});

this["JST"]["root_item"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? Handlebars.r(depth0,'model') : depth0)) != null ? Handlebars.r(stack1,'name') : stack1), depth0))
    + "\n";
},"useData":true});

this["JST"]["selected_item"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<a href=\"#\" class=\"btn btn-default\" alt=\""
    + alias2(alias1(((stack1 = (depth0 != null ? Handlebars.r(depth0,'model') : depth0)) != null ? Handlebars.r(stack1,'name') : stack1), depth0))
    + "\">"
    + alias2(alias1(((stack1 = (depth0 != null ? Handlebars.r(depth0,'model') : depth0)) != null ? Handlebars.r(stack1,'short_name') : stack1), depth0))
    + " <i class=\"material-icons\">clear</i></a>\n";
},"useData":true});

this["JST"]["tabs"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "  <li><a href=\"#\" id=\"search\"><i class=\"material-icons\">search</i> Search</a></li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "  <button type=\"button\" class=\"btn-preview\"><span>Preview</span> <i class=\"toggle-icon\"></i></button>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(Handlebars.r(partials,'search'),depth0,{"name":"search","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return " "
    + container.escapeExpression(Handlebars.r(helpers,'debug').call(alias1,depth0,{"name":"debug","hash":{},"data":data}))
    + "\n\n<ul class=\"browser-tabs-control\">\n  <li><a href=\"#\" id=\"browse\"><i class=\"material-icons\">list</i> Browse</a></li>\n"
    + ((stack1 = Handlebars.r(helpers,'if').call(alias1,(depth0 != null ? Handlebars.r(depth0,'has_search') : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\n\n"
    + ((stack1 = Handlebars.r(helpers,'if').call(alias1,(depth0 != null ? Handlebars.r(depth0,'has_preview') : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = container.invokePartial(Handlebars.r(partials,'browse'),depth0,{"name":"browse","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = Handlebars.r(helpers,'if').call(alias1,(depth0 != null ? Handlebars.r(depth0,'has_search') : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"usePartial":true,"useData":true});

this["JST"]["tree_item"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<a><span>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? Handlebars.r(depth0,'model') : depth0)) != null ? Handlebars.r(stack1,'name') : stack1), depth0))
    + "</span></a>\n<ul></ul>\n";
},"useData":true});

return this["JST"];

};