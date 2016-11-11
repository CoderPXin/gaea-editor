import * as React from 'react'
import * as typings from './editor-attribute-switch.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import {Switch} from '../../../../../web-common/switch/index'
import {autoBindMethod} from '../../../../../common/auto-bind/index'

import './editor-attribute-switch.scss'

@EditorManager.observer(['viewport'])
export default class EditorAttributeSelect extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'editorAttributeSwitch'

    @EditorManager.lazyInject(EditorManager.ViewportAction) private viewportAction: EditorManager.ViewportAction

    @autoBindMethod handleChange(checked: boolean) {
        console.log(checked)
        this.viewportAction.setComponentProps(this.props.viewport.currentEditComponentMapUniqueKey, this.props.editInfo.field, checked)
    }

    render() {
        const switchOpts = {
            label: '',
            disabled: this.props.editInfo.editable === false,
            checked: this.props.viewport.currentEditComponentInfo.props[this.props.editInfo.field] || false,
            options: this.props.editInfo.selector,
            onChange: this.handleChange
        }

        return (
            <div className="_namespace">
                <div className="label">
                    {this.props.editInfo.label}
                </div>
                <div className="input-container">
                    <Switch {...switchOpts} />
                </div>
            </div>
        )
    }
}