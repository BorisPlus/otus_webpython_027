# Create your tests here.
from flood_app import models
from django.db import models as django_models
import pytest

DO_NOT_TEST_RELATION = None

'''
def test():
    assert DO_NOT_TEST_RELATION is None
'''

'''
from datetime import datetime, timedelta
testdata = [
    (datetime(2001, 12, 12), datetime(2001, 12, 11), timedelta(1)),
    (datetime(2001, 12, 11), datetime(2001, 12, 12), timedelta(-1)),
]

@pytest.mark.parametrize("a,b,expected", testdata)
def test_timedistance_v0(a, b, expected):
    diff = a - b
    assert diff == expected

@pytest.mark.parametrize("a,b,expected", testdata, ids=["forward", "backward"])
def test_timedistance_v1(a, b, expected):
    diff = a - b
    assert diff == expected

'''

'''
IS THE SAME
'''

'''
class PyTestFixture:
    test_data = [
        (datetime(2001, 12, 12), datetime(2001, 12, 11), timedelta(1)),
        (datetime(2001, 12, 11), datetime(2001, 12, 12), timedelta(-1)),
    ]

    @staticmethod
    def build():
        return {'argvalues': __class__.test_data, 'ids': ["forward", "backward"]}


@pytest.mark.parametrize("a,b,expected", **PyTestFixture.build())
def test_time_distance_v0(a, b, expected):
    diff = a - b
    assert diff == expected
    
'''


class LowLevelTddFixture:
    DO_NOT_TEST_RELATION = None
    models_definitions = {
        'User': {
            'username': (django_models.CharField, DO_NOT_TEST_RELATION),
        },
        'Chat': {
            'name': (django_models.CharField, DO_NOT_TEST_RELATION),
            'created_at': (django_models.DateTimeField, DO_NOT_TEST_RELATION),
            'owner': (django_models.ForeignKey, models.User)
        },
        'ChatMessage': {
            'text': (django_models.CharField, DO_NOT_TEST_RELATION),
            'created_at': (django_models.DateTimeField, DO_NOT_TEST_RELATION),
            'owner': (django_models.ForeignKey, models.User),
            'chat': (django_models.ForeignKey, models.Chat)
        },
        'Access': {
            'rank_order': (django_models.PositiveIntegerField, DO_NOT_TEST_RELATION),
            'user': (django_models.ForeignKey, models.User),
            'chat': (django_models.ForeignKey, models.Chat)
        },
    }

    @staticmethod
    def build():
        fixtures = []
        ids = []
        for model_name in __class__.models_definitions:
            field_definition = __class__.models_definitions[model_name]
            for field_name in field_definition:
                fixture = (model_name, field_name, field_definition[field_name][0], field_definition[field_name][1])
                fixtures.append(fixture)
                ids.append(
                    '%s.%s must be %s with relation to %s' % (
                        model_name, field_name, field_definition[field_name][0], field_definition[field_name][1]
                    )
                )

        return {'argvalues': fixtures, 'ids': ids}


@pytest.mark.parametrize("model_class_name,field_name,field_class,field_relation", **LowLevelTddFixture.build())
def test_model_class_exists(model_class_name, field_name, field_class, field_relation):
    assert (model_class_name in dir(models) and
            callable(getattr(models, model_class_name)) and
            issubclass(getattr(models, model_class_name), django_models.Model))


@pytest.mark.parametrize("model_class_name,field_name,field_class,field_relation", **LowLevelTddFixture.build())
def test_model_class_fields_exists(model_class_name, field_name, field_class, field_relation):
    model_class = getattr(models, model_class_name)
    assert getattr(model_class, field_name, None) is not None


@pytest.mark.parametrize("model_class_name,field_name,field_class,field_relation", **LowLevelTddFixture.build())
def test_model_class_fields_types(model_class_name, field_name, field_class, field_relation):
    model_class = getattr(models, model_class_name)
    model_class_field_class_real = model_class._meta.get_field(field_name).__class__
    assert model_class_field_class_real == field_class


@pytest.mark.parametrize("model_class_name,field_name,field_class,field_relation", **LowLevelTddFixture.build())
def test_model_class_fields_related_models(model_class_name, field_name, field_class, field_relation):
    if field_relation  == DO_NOT_TEST_RELATION:
        return
    model_class = getattr(models, model_class_name)
    model_class_field_related_model_real = model_class._meta.get_field(field_name).related_model
    assert model_class_field_related_model_real == field_relation
