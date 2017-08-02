/**
 * Created by yeanzhi on 17/7/19.
 */
'use strict';
import React, {Component} from 'react';
import CommentItem from './item';
import {getEditor} from '../../lib/quillEditor';

export default class CommentList extends Component {

    /*
    * comment:{
    *   index:0,
    *   length:0
    *   comment:'1,2,3'
    * }
    * */
    state = {
        comments: []
    };

    componentDidMount() {
        if (getEditor()) {
            getEditor().on('text-change', this.onTextChange);
        }
    }

    componentWillUnmount() {
        if (getEditor()) {
            getEditor().off('text-change', this.onTextChange);
        }
    }

    /*
    * delta 首字符的话  只有  insert delete
    * 其他地方，会有 retain ，insert delete 两个
    * insert是往后插入的retain
    * delete是往前删除的retain
    *
    * */
    onTextChange = (delta, oldDelta, source) => {
        console.log('comments',delta)
        delta.ops.forEach(item => {
            if (item.attributes) {
                if (item.attributes['comments']) {
                } else if (item.attributes['comments'] === null) {
                }
            }
        });
    };

    render() {
        return (
            <div>
                {
                    this.state.comments.sort((a, b) => a.index - b.index).map((_, i) => {
                        return (
                            <CommentItem key={i} comment={_}/>
                        )
                    })
                }
            </div>
        )
    }
}