---
layout: post
title:  "django中template和vue结合"
categories: Vue
tags:  Django Template Vue 工作经验
author: 陈超文
---

* content
{:toc}
非逼于无奈不要这样用




# 理清思路
Django template 与 Vue 结合使用，首先要弄清渲染思路顺：<br>
Django直接在后端渲染出JS对象，Vue在前端根据该JS对象继续渲染 <br>
我们可以根据 [Python工作中的问题][dfewf] 的第6点进行django与vue的前后端结合 <br>
# template中使用vue经验
## index+conponent+mixin
### index.html(vue)

{%raw%}
```html
{% extends "utils/templates/load_template_error.html" %}

{% load static %}
{% load i18n %}


{% block content %}

    <div id="pwd_strategy" aria-hidden="true" class="col-sm-8">

        {#    前端验证信息----------------------------#}
        <div class="messages" id="validate_message" style="display: none;">
            <div class="alert alert-danger">
                <a class="close" onclick="$('#validate_message').hide()"><span class="fa fa-times"></span></a>
                <div>{% trans "Total of other value must less than password min length" %}</div>
            </div>
        </div>


        <form id="pwd_strategy_form" action="{% url 'horizon:project:access_and_security:pwd_strategy:update' %}"
              class="form-horizontal" method="post">
            {#        {% csrf_token %}#}
            <input type="hidden" name="csrfmiddlewaretoken" :value="csrftoken">

            <form-group v-for="(field,key) in fields"
                        :id="key" :val="obj[key]" :key="key" :field="field"
                        label_class="col-xs-3" input_class="col-xs-5"
                        @val_changed="change_val"></form-group>


            {#        密码最长使用天数#}
            <div class="form-group"
                 :class="{'has-error':fields.max_use_day.has_error,'has-warning':fields.max_use_day.has_warning}">
                <label class="control-label col-xs-3">
                    <input type="checkbox" name="is_day_limit"
                           v-model="obj.is_day_limit"> #{fields.is_day_limit.label}
                </label>
                <div class="col-xs-5">
                    <input type="number" class="form-control" name="max_use_day" min="1" max="7"
                           v-model="obj.max_use_day"
                           :disabled="!obj.is_day_limit">
                    <div v-if="fields.max_use_day.has_error"
                         class="help-block">#{fields.max_use_day.error_msg}
                    </div>
                </div>
            </div>

            {#        按钮#}
            <div class="form-group">
                <div class="col-sm-6">
                    <button type="button" class="btn btn-primary" @click="submit_validate">{% trans "Save" %}</button>
                    <button type="button" class="btn btn-primary" @click="reset">{% trans "Reset" %}</button>
                </div>
            </div>

        </form>
    </div>

    {#引入css#}
    {#<link rel="stylesheet" href="{% static 'dashboard/project/access_and_security/pwd_strategy/index.css?v=2' %}">#}
    {#<script src="{% static 'utils/js/form_component/field.js' %}"></script>#}
    {#引用vue#}
    <script type="text/javascript" src="{% static 'utils/js/vue.js' %}"></script>

    {#引用组件#}
    {#{% include 'project/access_and_security/pwd_strategy/component/field.html' %}#}
    {% include 'utils/components/form-group.html' with id='pwd_strategy' %}
    {% include 'utils/components/ajax-messages.html' with id='pwd_strategy' %}
    {% include 'utils/mixins/form_mixin.html' with id='pwd_strategy' %}


    <script>


        $(function () {
            //加载css
            $('#pwd_strategy').after(`<link rel="stylesheet" href="{% static 'dashboard/project/access_and_security/pwd_strategy/index.css' %}?v=${new Date().getTime()}">`);
            //console错误
            if ('{{ server_error }}') console.error('{{ server_error }}');
        });
        var app = new Vue({
            el: '#pwd_strategy',
            mixins: [form_mixin],
            data: {
                fields: {
                    is_first_login_change: {
                        type: 'checkbox',
                        label: '{% trans "Must change the password at the first login" %}:',
                        unit: '',
                        has_error: false,
                        error_msg: '',
                        has_warning: false,
                    },
                    pwd_min_len: {
                        type: 'number',
                        label: '{% trans "password min length" %}:',
                        unit: '',
                        has_error: false,
                        error_msg: '{% trans "Please input a integer bigger or equal %s" %}8',
                        has_warning: false,
                        validate: integer_validate('>=',8)
                    },
                    eng_low_min_num: {
                        type: 'number',
                        label: '{% trans "least number of lower case character" %}:',
                        unit: '{% trans "num" %}',
                        has_error: false,
                        error_msg: '{% trans "Please input a integer bigger or equal " %}0',
                        has_warning: false,
                        validate: integer_validate('>=',0),
                    },
                    eng_cap_min_num: {
                        type: 'number',
                        label: '{% trans "least number of capital character" %}:',
                        unit: '{% trans "num" %}',
                        has_error: false,
                        error_msg: '{% trans "Please input a integer bigger or equal " %}0',
                        has_warning: false,
                        validate: integer_validate('>=',0)
                    },
                    num_min_num: {
                        type: 'number',
                        label: '{% trans "least number of number" %}:',
                        unit: '{% trans "num" %}',
                        has_error: false,
                        error_msg: '{% trans "Please input a integer bigger or equal " %}0',
                        has_warning: false,
                        validate: integer_validate('>=',0)
                    },
                    spec_min_num: {
                        type: 'number',
                        label: '{% trans "least number of specifial character" %}:',
                        unit: '{% trans "num" %}',
                        has_error: false,
                        error_msg: '{% trans "Please input a integer bigger or equal " %}0',
                        has_warning: false,
                        validate: integer_validate('>=',0),
                    },
                    is_day_limit: {
                        type: '',
                        label: '{% trans "the longest days of using this password" %}:',
                        unit: '',
                        has_error: false,
                        error_msg: '',
                        has_warning: false,
                    },
                    max_use_day: {
                        type: '',
                        label: '',
                        unit: '',
                        has_error: false,
                        error_msg: '{% trans "Please input a integer bigger than " %}0',
                        has_warning: false,
                    }
                },//使用模板渲染
            },
            computed: {},
            methods: {
                submit_validate: function () {
                    //单个验证不通过，终止提交
                    if (!this.all_fields_validate()) return;
                    // 验证密码最小长度要大于其他值
                    if (this.obj.pwd_min_len < (Number(this.obj.eng_low_min_num) + Number(this.obj.eng_cap_min_num) + Number(this.obj.num_min_num) + Number(this.obj.spec_min_num))) {
                        $('#validate_message').show();
                        this.fields.pwd_min_len.has_warning = true;
                        this.fields.eng_low_min_num.has_warning = true;
                        this.fields.eng_cap_min_num.has_warning = true;
                        this.fields.num_min_num.has_warning = true;
                        this.fields.spec_min_num.has_warning = true;
                        return;
                    }
                    //验证使用密码最长天数的时候，最长天数要大于0且为整数
                    if (this.obj.is_day_limit && this.obj.is_day_limit == "true") {
                        this.obj.max_use_day = Math.floor(this.obj.max_use_day);
                        if (!this.obj.max_use_day || this.obj.max_use_day <= 0) {
                            this.fields.max_use_day.has_error = true;
                            return;
                        }
                    }
                    //补空
                    if(!this.obj.is_day_limit) this.obj.is_day_limit='';
                    if(!this.obj.max_use_day) this.obj.max_use_day=false;
                    this.ajax_submit('pwd_strategy_form');
                },
            },
            created: function () {
                const vm = this;
            }
        });
    </script>

{% endblock %}




```


### form-group.html(component)

```html
{% load static %}
{% load i18n %}

<template id="form-group">
    <div>
        {#                number 类型输入框#}
        <div class="form-group" v-if="field.type=='number'"
             :class="{'has-error':field.has_error,'has-warning':field.has_warning}">
            <slot name="label">
                <label :for="id" class="control-label" :class="label_class">#{field.label}
                    <span v-if="field.help_text" class="fa fa-question-circle" data-toggle="tooltip"
                          data-placement="right" style="position: relative;"
                          :title="field.help_text"></span></label>
            </slot>
            <slot name="input">
                <div :class="input_class">
                    <input type="number" class="form-control" :id="id" :name="id"
                           :value="val" @input="change_val($event.target.value)"
                           @blur="single_validate(id)">
                    <slot name="error_text">
                        <div v-if="field.has_error"
                             class="help-block">#{field.error_msg}
                        </div>
                    </slot>
                </div>
            </slot>
            <slot name="unit">
                <div class="form-control-static" style="font-weight: bold;color: #6E6E6E;">#{field.unit}</div>
            </slot>

        </div>

        {#   单个checkbox类型 #}
        <div class="form-group" v-if="field.type=='checkbox'"
             :class="{'has-error':field.has_error,'has-warning':field.has_warning}">
            <slot name="label">
                {#                    <div class="checkbox" :class="label_class">#}
                {#                        <label :for="id" class="control-label" :class="label_class">#}
                {#                            <slot name="input">#}
                {#                                <input :id="id" :name="id" type="checkbox"#}
                {#                                       :checked="val2bool(val)"#}
                {#                                       @change="change_val($event.target.checked)"#}
                {#                                       @blur="single_validate(id)">#}
                {#                            </slot>#}
                {#                            #{field.label}#}
                {#                        </label>#}
                {#                    </div>#}
                <label :for="id" class="control-label" :class="label_class">
                    <slot name="input">
                        <input :id="id" :name="id" type="checkbox"
                               :checked="val2bool(val)"
                               @change="change_val($event.target.checked)"
                               @blur="single_validate(id)">
                    </slot>
                    #{field.label}
                    <span v-if="field.help_text" class="fa fa-question-circle" data-toggle="tooltip"
                          data-placement="right" style="position: relative;"
                          :title="field.help_text"></span>
                </label>
            </slot>

            <slot name="error_text">
                <span v-if="field.has_error" class="help-block">#{field.error_msg}</span>
            </slot>
        </div>

    </div>


</template>

<script>
    Vue.component('form-group',
        {
            template: '#form-group',
            delimiters: ['#{', '}'],
            props: {
                id: {
                    type: String,
                },
                val: {
                    default: ''
                },
                field: {
                    type: Object,
                    require: true
                },
                label_class: {
                    type: String,
                    default: 'col-xs-4'
                },
                input_class: {
                    type: String,
                    default: 'col-xs-8'
                }
            },
            data() {
                const vm = this;
                return {};
            },
            computed: {},
            methods: {
                single_validate: function (id) {
                    if (!this.field.validate) {
                        //提示需要定义validate方法
                        console.warn(`请先定义this.fields.${id}.validate方法`);
                        return; //如果没有定义验证的方法，直接跳过
                    }
                    if (!this.field.validate(this.val)) {
                        this.field.has_error = true;
                    } else {
                        this.field.has_error = false;
                    }
                },
                //值转boolean
                val2bool(val) {
                    if (val == 'true' | val == 1 | val) return true;
                    return false;
                },
                change_val(value) {
                    this.$emit('val_changed', {id: this.id, val: value})
                },

                reload() {
                    const vm = this;
                },
            },
            created: function () {

            },
            mounted: function () {
                //激活提示信息
                $('[data-toggle="tooltip"]').tooltip();
            }
        }
    )
    ;
</script>

<style type="text/css">
    .tooltip {
        width: 20rem;
    }
</style>
```
### form_mixin.html(vue mixin)
```html
<script>
    // 获取cookie
    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }

    // 整数验证 ‘>=’
    function integer_validate(symbol, num) {
        return function (val) {
            if (!val) return false;
            if (val - Math.floor(val) != 0) return false;
            return eval(val + symbol + num);
        }
    }

    var form_mixin = {
        delimiters: ['#{', '}'],
        data: {
            obj: '',
            cache: '',
            csrftoken: '',
        },
        computed: {},
        methods: {
            reset: function () {
                this.obj = $.extend(true, {}, this.cache);
            },
            single_validate: function (id) {
                let obj_name = id;
                if (!this.fields[obj_name].validate) {
                    return false; //如果没有定义验证的方法，直接跳过
                }
                if (!this.fields[obj_name].validate(this.obj[obj_name])) {
                    return this.fields[obj_name].has_error = true;
                } else {
                    return this.fields[obj_name].has_error = false;
                }
            },
            all_fields_validate: function () {
                const vm = this;

                let flag = true;
                //各个input先验证一次
                for (let key in vm.fields) {
                    //顺便清空本来的error信息
                    vm.fields[key].has_error = false;
                    vm.fields[key].has_warning = false;
                    // 单个验证
                    if (this.single_validate(key)) flag = false; //有一个不通过马上返回false
                }
                //返回是否验证通过
                return flag;
            },
            ajax_submit: function (form_id) {
                const vm = this;
                // csrf验证
                vm.obj.csrfmiddlewaretoken = vm.csrftoken;
                let $form = $(`#${form_id}`);
                {#$form.submit();#}
                $.ajax({
                    url: $form.attr('action'),
                    type: 'POST',
                    data: vm.obj,
                });
            },

            change_val(payload) {
                this.obj[payload.id] = payload.val;
            }


        },
        created: function () {
            const vm = this;

            vm.csrftoken = getCookie("csrftoken");

            //初始化值

            this.obj = JSON.parse('{{ obj | safe }}');
            if (this.obj.server_error) console.error(this.obj.server_error);
            this.cache = JSON.parse('{{ obj | safe }}');
        }
    }
</script>

```
### ajax-messages.html
```html
{% load static %}
{% load i18n %}
{#    消息框#}
<div id="{{ id }}_ajax_messages">
    <div class="messages">
        {#    ------------后台处理成功信息-----------#}
        <div class="alert alert-success" role="alert" id="server_success_message"
             style="display: none;background-color: #DFF0D8;color: #3C9FB5;">
            <a class="close" onclick="$('#{{ id }}_ajax_messages').find('#server_success_message').hide()"><span
                    class="fa fa-times"></span></a>
            <div>{% trans "Operation Success" %}</div>
        </div>
        {#    ------------服务器错误信息-----------#}
        <div class="alert alert-danger" role="alert" id="server_error_message" style="display: none;">
            <a class="close" onclick="$('#{{ id }}_ajax_messages').find('#server_error_message').hide()"><span
                    class="fa fa-times"></span></a>
            <div>{% trans "A server error occurred.  Please contact the administrator." %}</div>
        </div>
    </div>

    {#    自己加的--------加载蒙版--------------------#}
    <div id="loading_modal" class="modal_background loading" style="display: none;">
        <div class="content">
            <div class="img"></div>
            <div class="text">{% trans "Data Loanding.Please Wait" %}<span
                    class="loading_toggle"></span></div>
        </div>
    </div>

</div>

<script>

    $(function () {
        $('#{{id}}_ajax_messages').find('#loading_modal').after(`<link rel="stylesheet" href="{% static 'utils/less/components/ajax-messages.css' %}?v=${new Date().getTime()}">`);

    });

    //动态蒙版
    function start_loading_toggle() {
        let index = 0;
        let arr = ['.', '..', '...'];
        arr.forEach(function (val, index) {
            $('#{{id}}_ajax_messages').find('.loading_toggle').html(val);
        });
        toggle_interval = setInterval(function () {
            $('#{{id}}_ajax_messages').find('.loading_toggle').html(arr[index]);
            index++;
            if (index > arr.length) index = 0;
        }, 1000);
    }

    $(function () {
        //ajax公用
        //加载蒙版和返回信息
        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                debugger;
                {#xhr.setRequestHeader("X-CSRFtoken", vm.csrftoken);#}
                start_loading_toggle();
                $('#{{id}}_ajax_messages').find('.loading').show();
            },
            complete: function () {
                debugger;
                clearInterval(toggle_interval);
                $('#{{id}}_ajax_messages').find('.loading').hide();
            },
            error: function (data, textStatus, jqXHR) {
                if (data.status == 401) return;
                if (data.responseJSON) {
                    console.error('=================\n' +
                        data.responseJSON.server_error + '\n' +
                        '=================');
                } else {
                    console.error(textStatus + ":" + jqXHR);
                }
                $('#{{id}}_ajax_messages').find('#server_error_message').show();
            },
            success: function (data, textStatus, jqXHR) {
                $('#{{id}}_ajax_messages').find('#server_success_message').show();
                setTimeout(function () {
                    $('#{{id}}_ajax_messages').find('#server_success_message').hide();
                }, 5000)
            },

            statusCode: {
                401: function () {
                    let href = '/auth/login/';
                    window.location = href;
                }
            },
        });
    });
</script>



```
### load_template_error.html
```html
{% load static %}
{% load i18n %}


{% if not server_error|length > 0 %}
    {% block content %}
    {% endblock %}
{% else %}
    <div style="padding: 1rem;">
        <div class="alert alert-danger alert-dismissible fade in" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span
                    aria-hidden="true">×</span>
            </button>
            <h4>{% trans "Server Error" %}</h4>
            <p>{% trans "A server error occurred.  Please contact the administrator." %}</p>
            <p>
                <button type="button" class="btn btn-default btn-sm"
                        onclick="$(event.target).parent().parent().alert('close');">{% trans "Confirm" %}</button>
            </p>
        </div>
    </div>

    {#    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css"#}
    {#          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">#}

    <script src='{% static "dashboard/js/bootstrap.min.js" %}'></script>
    <script>
        $(function () {
            console.error(`===========================================\n` +
                `server_error:{{ server_error|safe }}\n` +
                `===========================================`);
        });
    </script>
    <style>
        .alert {
            padding: 15px;
            margin-bottom: 20px;
            border: 1px solid transparent;
            border-radius: 4px;
        }

        .alert h4 {
            margin-top: 0;
            color: inherit;
        }

        .alert-dismissible {
            padding-right: 35px;
        }

        .alert-danger {
            color: #a94442;
            background-color: #f2dede;
            border-color: #ebccd1;
        }

        .fade.in {
            opacity: 1;
        }

        .close {
            float: right;
            font-size: 21px;
            font-weight: 700;
            line-height: 1;
            color: #000;
            text-shadow: 0 1px 0 #fff;
            filter: alpha(opacity=20);
            opacity: .2;
        }

        .h4, h4 {
            font-size: 18px;
            font-family: inherit;
            font-weight: 500;
            line-height: 1.1;
            margin-bottom: 10px;
            box-sizing: border-box;
            display: block;
            -webkit-margin-before: 1.33em;
            -webkit-margin-after: 1.33em;
            -webkit-margin-start: 0px;
            -webkit-margin-end: 0px;
        }

        .alert > p, .alert > ul {
            margin-bottom: 0;
        }

        p {
            margin: 0 0 10px;
        }

        p {
            display: block;
            -webkit-margin-before: 1em;
            -webkit-margin-after: 1em;
            -webkit-margin-start: 0px;
            -webkit-margin-end: 0px;
        }
    </style>
{% endif %}


```
## template模板语言与vue结合（超级恶心）
### _data_table_row_actions_dropdown.html
```html
{% load horizon i18n %}

{% spaceless %} {# This makes sure whitespace doesn't affect positioning for dropdown. #}
    <div class="action_column" id="row_action_{{ row_id | safe }}">
        {% if row_actions %}
            {% if row_actions|length == 1 %}
                {% include "horizon/common/_data_table_action.html" with action=row_actions.0 is_single=1 %}
            {% elif row_actions|length > 1 %}
                <div class="btn-group">
                    {% for action in row_actions %}
                        {% if forloop.first %}
                            {% include "horizon/common/_data_table_action.html" with is_small=1 is_single=1 %}
                            <a class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" href="#">
                                <span class="fa fa-caret-down"></span>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-right row_actions">
                        {% else %}
                            <li>
                                {% include "horizon/common/_data_table_action.html" %}
                            </li>
                        {% endif %}
                    {% if forloop.last %}
                        </ul>
                    {% endif %}
                    {% endfor %}
                </div>
            {% endif %}
        {% else %}

            <template v-if="row_actions.length == 1">
                <template v-if="row_actions[0].method !='GET'">
                    <data-table-action-post {{ attr_string_nc_list.0 }} :action="row_actions[0]" :row_id="row_id"
                                            :is_single="1"></data-table-action-post>
                </template>
                <template v-else>
                    <data-table-action-get {{ attr_string_nc_list.0 }} :action="row_actions[0]" :row_id="row_id"
                                           :is_single="1"></data-table-action-get>
                </template>
            </template>
            <template v-else-if="row_actions.length > 1">
                <div class="btn-group">
                    <template v-if="row_actions[0].method !='GET'">
                        <data-table-action-post {{ attr_string_nc_list.0 }} :action="row_actions[0]" :row_id="row_id"
                                                :is_small="1"
                                                :is_single="1"></data-table-action-post>
                    </template>
                    <template v-else>
                        <data-table-action-get {{ attr_string_nc_list.0 }} :action="row_actions[0]" :row_id="row_id"
                                               :is_small="1"
                                               :is_single="1"></data-table-action-get>
                    </template>

                    <a class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" href="#">
                        <span class="fa fa-caret-down"></span>
                    </a>

                    <ul class="dropdown-menu dropdown-menu-right row_actions">
                        {% for attr_string_nc in attr_string_nc_list %}
{#                        <template v-for="(action, index) in row_actions">#}
                            <li v-if="{{ forloop.counter0 }}!=0">
                                <template v-if="row_actions[{{ forloop.counter0 }}].method !='GET'">
                                    <data-table-action-post {{ attr_string_nc }} :action="row_actions[{{ forloop.counter0 }}]" :row_id="row_id"></data-table-action-post>
                                </template>
                                <template v-else>
                                    <data-table-action-get {{ attr_string_nc }} :action="row_actions[{{ forloop.counter0 }}]" :row_id="row_id"></data-table-action-get>
                                </template>
                            </li>
{#                        </template>#}
                        {% endfor %}

                    </ul>
                </div>
            </template>
        {% endif %}

    </div>
{% endspaceless %}
{#{{ row_actions.0 }}#}
{#{{ obj }}#}
{% if not row_actions %}
    <script src="https://cdn.jsdelivr.net/npm/vue@2.5.15/dist/vue.js"></script>
    {% include "horizon/common/component/_data_table_action_component_get.html" %}
    {% include "horizon/common/component/_data_table_action_component_post.html" %}


    <script>
        var app = new Vue({
            el: "#row_action_{{ row_id | safe }}",
            delimiters: ['#{', '}'],
            // mixins: [form_mixin],
            data: {},
            computed: {},
            methods: {},
            created: function () {
                const vm = this;
                this.row_actions = {{ objs | safe }};
                this.row_id = '{{ row_id }}';
                a = 1;
            }
        });

    </script>
{% endif %}


```
### _data_table_action_conponent_post.html
```html
{% load horizon %}
<template id="data_table_action_post">
    <button class="data-table-action btn"
            name="action" type="submit"
{#            :id="attr_string_nc.id"#}
{#            :data-batch-action="attr_string_nc.data_batch_action"#}
            :help_text="action.help_text"
            :value="is_table_action?action.get_param_name:action.table.name+'__'+action.name +'__'+row_id"
{#            :class="[attr_string_nc.class,default_classes,{'btn-sm':is_small}]">#}
            :class="[default_classes,{'btn-sm':is_small}]">
        <template v-if="is_table_action">
            <span v-if="icon_class" :class="icon_class"></span>
            <template v-if="action.handles_multiple">
                #{ action.verbose_name_plural }
            </template>
            <template v-else>
                #{ action.verbose_name }
            </template>
        </template>
        <template v-else>
            #{ action.verbose_name }
        </template>
    </button>
</template>


{#    {% minifyspace %}#}
{#        {% if action.method != "GET" %}#}
{#            <button {{ action.attr_string_nc|safe }}#}
{#                    class="data-table-action {% if is_small %}btn-sm{% endif %}#}
{#                {% for class in action.get_default_classes %}#}
{#                  {{ class }}#}
{#                {% endfor %}#}
{#                {% if action.action_type %}#}
{#                  btn-{{ action.action_type }}#}
{#                {% endif %} btn"#}
{#                    name="action"#}
{#                    {% if action.help_text %}#}
{#                    help_text="{{ action.help_text }}"#}
{#                    {% endif %}#}
{#                    type="submit"#}
{#                    {% if is_table_action %}#}
{#                    value="{{ action.get_param_name }}">#}
{#                        {% if action.icon != None %}#}
{#                            <span class="fa fa-{{ action.icon }}"></span>#}
{#                        {% endif %}#}
{#                        {% if action.handles_multiple %}#}
{#                            {{ action.verbose_name_plural }}#}
{#                        {% else %}#}
{#                            {{ action.verbose_name }}#}
{#                        {% endif %}#}
{#                    {% else %}#}
{#                        value="{{ action.table.name }}__{{ action.name }}__{{ row_id }}">#}
{#                        {{ action.verbose_name }}#}
{#                    {% endif %}#}
{#            </button>#}
{#        {% else %}#}
{#            <a {{ action.attr_string_nc|safe }}#}
{#                    class="btn data-table-action {% if is_single %}btn-default {% endif %}{% if is_small %}btn-sm {% endif %}{{ action.get_final_css|safe }}"#}
{#                    {% if is_table_action %}#}
{#                    href="{{ action.get_link_url }}"#}
{#                    title="{{ action.verbose_name }}">#}
{#                        {% if action.icon != None %}#}
{#                            <span class="fa fa-{{ action.icon }}"></span>#}
{#                        {% endif %}#}
{#                    {% else %}#}
{#                        href="{{ action.bound_url }}">#}
{#                    {% endif %}#}
{#            {{ action.verbose_name }}#}
{#            </a>#}
{#        {% endif %}#}
{#    {% endminifyspace %}#}


<script>
    Vue.component('data-table-action-post',
        {
            template: '#data_table_action_post',
            delimiters: ['#{', '}'],
            props: {
                action: {
                    type: Object,
                    require: true,
                },
                row_id: {
                    type: String,
                    require: true,
                },
                is_single: {
                    type: Number,
                    default: 0
                },
                is_small: {
                    type: Number,
                    default: 0
                },
                is_table_action: {
                    type: Number,
                    default: 0
                }

                {% comment %}
                id: {
                    type: String,
                },
                val: {
                    default: ''
                },
                field: {
                    type: Object,
                    require: true
                },
                label_class: {
                    type: String,
                    default: 'col-xs-4'
                },
                input_class: {
                    type: String,
                    default: 'col-xs-8'
                }
                {% endcomment %}
            },
            data() {
                const vm = this;
                return {};
            },
            computed: {
                {#attr_string_nc() {#}
                {#    let attrs = this.action.attr_string_nc.split(' ');#}
                {#    let new_attrs = {};#}
                {#    if (!attrs) return new_attrs;#}
                {#    attrs.map(function (val, index, arr) {#}
                {#            if (index == 0) return;//第一个是“”，没用#}
                {#            if (val.split('=')[0] == 'data-batch-action') {#}
                {#                new_attrs['data_batch_action'] = JSON.parse(val.split('=')[1]);#}
                {#            }#}
                {#            if (val.split('=')[0] == 'class') {#}
                {#                debugger;#}
                {#            }#}
                {#            new_attrs[val.split('=')[0]] = JSON.parse(val.split('=')[1]);#}
                {#        }#}
                {#    );#}
                {#    return new_attrs;#}
                {# },#}
                default_classes() {
                    let classes = {};
                    if (this.action.action_type) classes['btn-' + this.action.action_type] = true;
                    if (this.action.get_default_classes.length === 0) return classes;
                    this.action.get_default_classes.map(function (val, index, arr) {
                        classes[val] = true;
                    });
                    return classes
                },
                get_final_css() {
                    let final_csses = this.action.get_final_css.split(' ');
                    let final_csses_dict = {};
                    final_csses.map(function (val, index, arr) {
                        final_csses_dict[val] = true;
                    });
                    return final_csses_dict;
                },
                icon_class() {
                    if (this.action.icon) {
                        let css = {};
                        css[`fa fa-${this.action.icon}`] = true;
                        return css
                    }
                },
            },
            methods: {
                reload() {
                    const vm = this;
                },
            },
            created: function () {
                {#debugger#}
            },
            mounted: function () {

            }
        }
    )
    ;
</script>

<style type="text/css">

</style>

```
### _data_table_action_conponent_get.html
```html
{% load horizon %}
<template id="data_table_action_get">
    <a
{#            :id="attr_string_nc.id"#}
{#       :data-batch-action="attr_string_nc.data_batch_action"#}
       :class="[{'btn-default':is_single,'btn-sm':is_small},get_final_css]"
       class="btn data-table-action"
       :href="is_table_action?action.get_link_url:action.bound_url"
       :title="is_table_action?action.verbose_name:''">
        <span v-if="icon_class" :class="icon_class"></span>
        #{ action.verbose_name }
    </a>
</template>


{#    {% minifyspace %}#}
{#        {% if action.method != "GET" %}#}
{#            <button {{ action.attr_string_nc|safe }}#}
{#                    class="data-table-action {% if is_small %}btn-sm{% endif %}#}
{#                {% for class in action.get_default_classes %}#}
{#                  {{ class }}#}
{#                {% endfor %}#}
{#                {% if action.action_type %}#}
{#                  btn-{{ action.action_type }}#}
{#                {% endif %} btn"#}
{#                    name="action"#}
{#                    {% if action.help_text %}#}
{#                    help_text="{{ action.help_text }}"#}
{#                    {% endif %}#}
{#                    type="submit"#}
{#                    {% if is_table_action %}#}
{#                    value="{{ action.get_param_name }}">#}
{#                        {% if action.icon != None %}#}
{#                            <span class="fa fa-{{ action.icon }}"></span>#}
{#                        {% endif %}#}
{#                        {% if action.handles_multiple %}#}
{#                            {{ action.verbose_name_plural }}#}
{#                        {% else %}#}
{#                            {{ action.verbose_name }}#}
{#                        {% endif %}#}
{#                    {% else %}#}
{#                        value="{{ action.table.name }}__{{ action.name }}__{{ row_id }}">#}
{#                        {{ action.verbose_name }}#}
{#                    {% endif %}#}
{#            </button>#}
{#        {% else %}#}
{#            <a {{ action.attr_string_nc|safe }}#}
{#                    class="btn data-table-action {% if is_single %}btn-default {% endif %}{% if is_small %}btn-sm {% endif %}{{ action.get_final_css|safe }}"#}
{#                    {% if is_table_action %}#}
{#                    href="{{ action.get_link_url }}"#}
{#                    title="{{ action.verbose_name }}">#}
{#                        {% if action.icon != None %}#}
{#                            <span class="fa fa-{{ action.icon }}"></span>#}
{#                        {% endif %}#}
{#                    {% else %}#}
{#                        href="{{ action.bound_url }}">#}
{#                    {% endif %}#}
{#            {{ action.verbose_name }}#}
{#            </a>#}
{#        {% endif %}#}
{#    {% endminifyspace %}#}


<script>
    Vue.component('data-table-action-get',
        {
            template: '#data_table_action_get',
            delimiters: ['#{', '}'],
            props: {
                action: {
                    type: Object,
                    require: true,
                },
                row_id: {
                    type: String,
                    require: true,
                },
                is_single: {
                    type: Number,
                    default: 0
                },
                is_small: {
                    type: Number,
                    default: 0
                },
                is_table_action: {
                    type: Number,
                    default: 0
                }

                {% comment %}
                id: {
                    type: String,
                },
                val: {
                    default: ''
                },
                field: {
                    type: Object,
                    require: true
                },
                label_class: {
                    type: String,
                    default: 'col-xs-4'
                },
                input_class: {
                    type: String,
                    default: 'col-xs-8'
                }
                {% endcomment %}
            },
            data() {
                const vm = this;
                return {};
            },
            computed: {
                {#attr_string_nc() {#}
                {#    let attrs = this.action.attr_string_nc.split(' ');#}
                {#    let new_attrs = {};#}
                {#    if (!attrs) return new_attrs;#}
                {#    attrs.map(function (val, index, arr) {#}
                {#            if (index == 0) return;//第一个是“”，没用#}
                {#            if (val.split('=')[0] == 'data-batch-action') {#}
                {#                new_attrs['data_batch_action'] = JSON.parse(val.split('=')[1]);#}
                {#            }#}
                {#            if (val.split('=')[0] == 'class') {#}
                {#                debugger;#}
                {#            }#}
                {#            new_attrs[val.split('=')[0]] = JSON.parse(val.split('=')[1]);#}
                {#        }#}
                {#    );#}
                {#    return new_attrs;#}
                {# },#}
                default_classes() {
                    let classes = {};
                    if (this.action.action_type) classes['btn-' + this.action.action_type] = true;
                    if (this.action.get_default_classes.length === 0) return classes;
                    this.action.get_default_classes.map(function (val, index, arr) {
                        classes[val] = true;
                    });
                    return classes
                },
                get_final_css() {
                    let final_csses = this.action.get_final_css.split(' ');
                    let final_csses_dict = {};
                    final_csses.map(function (val, index, arr) {
                        final_csses_dict[val] = true;
                    });
                    return final_csses_dict;
                },
                icon_class() {
                    if (this.action.icon) {
                        let css = {};
                        css[`fa fa-${this.action.icon}`] = true;
                        return css
                    }
                },
            },
            methods: {
                reload() {
                    const vm = this;
                },
            },
            created: function () {
                {#debugger;#}
            },
            mounted: function () {

            }
        }
    )
    ;
</script>

<style type="text/css">

</style>

```
{%endraw%}

[dfewf]: /2018/04/25/Python_collection/#6django-模板结合vue时context内容注意事项编码问题 "aaaaa"