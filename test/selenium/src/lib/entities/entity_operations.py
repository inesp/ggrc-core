# Copyright (C) 2018 Google Inc.
# Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
"""Operations with entities."""
from lib import environment
from lib.constants import objects


def obj_type(cls):
  """Returns object type."""
  return cls.__name__.lower()


def obj_view_link(obj):
  """Returns `viewLink` for the object."""
  plural = objects.get_plural(obj.obj_type())
  return "{}/{}".format(plural, obj.obj_id)


def obj_url(obj):
  """Returns url to the object."""
  return environment.app_url + obj_view_link(obj)


def obj_code(object_type, obj_id):
  """Returns object code for `obj_type` and `obj_id`."""
  return "{}-{}".format(object_type.upper(), obj_id)
