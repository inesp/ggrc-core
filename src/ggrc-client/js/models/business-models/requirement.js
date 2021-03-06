/*
    Copyright (C) 2018 Google Inc.
    Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
*/

import Cacheable from '../cacheable';
import uniqueTitle from '../mixins/unique-title';
import caUpdate from '../mixins/ca-update';
import accessControlList from '../mixins/access-control-list';
import baseNotifications from '../mixins/base-notifications';
import Stub from '../stub';

export default Cacheable('CMS.Models.Requirement', {
  root_object: 'requirement',
  root_collection: 'requirements',
  model_plural: 'Requirements',
  table_plural: 'requirements',
  title_plural: 'Requirements',
  model_singular: 'Requirement',
  title_singular: 'Requirement',
  table_singular: 'requirement',
  category: 'governance',
  root_model: 'Requirement',
  findAll: 'GET /api/requirements',
  findOne: 'GET /api/requirements/{id}',
  create: 'POST /api/requirements',
  update: 'PUT /api/requirements/{id}',
  destroy: 'DELETE /api/requirements/{id}',
  is_custom_attributable: true,
  isRoleable: true,
  mixins: [
    uniqueTitle,
    caUpdate,
    accessControlList,
    baseNotifications,
  ],
  attributes: {
    context: Stub,
    modified_by: Stub,
  },
  tree_view_options: {
    attr_view: '/static/mustache/requirements/tree-item-attr.mustache',
    attr_list: Cacheable.attr_list.concat([
      {attr_title: 'Reference URL', attr_name: 'reference_url'},
      {attr_title: 'Effective Date', attr_name: 'start_date'},
      {attr_title: 'Last Deprecated Date', attr_name: 'last_deprecated_date'},
      {
        attr_title: 'State',
        attr_name: 'status',
        order: 40,
      }, {
        attr_title: 'Description',
        attr_name: 'description',
        disable_sorting: true,
      }, {
        attr_title: 'Notes',
        attr_name: 'notes',
        disable_sorting: true,
      }, {
        attr_title: 'Assessment Procedure',
        attr_name: 'test_plan',
        disable_sorting: true,
      }, {
        attr_title: 'Review State',
        attr_name: 'review_status',
        order: 80,
      }]),
    add_item_view: GGRC.mustache_path + '/snapshots/tree_add_item.mustache',
  },
  sub_tree_view_options: {
    default_filter: ['Objective'],
  },
  defaults: {
    status: 'Draft',
  },
  statuses: ['Draft', 'Deprecated', 'Active'],
  init: function () {
    this._super(...arguments);
    this.validateNonBlank('title');
  },
}, {});
