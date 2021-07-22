import React, { Component } from 'react';
import { Provider } from 'react-native-paper';
// import theme from '../theme';
import { Subheading, withTheme } from 'react-native-paper';
import { ProgressDialog } from 'react-native-simple-dialogs';

const withLoading = (WrappedComponent:any) => {
    class LoadingHocComponent extends Component {
        constructor(props : any) {
            super(props);
            this.state = {
                visible: false,
                text: "Please, wait..."
            };
        }

        showLoading(text : any ) {
            this.setState({
                visible: true,
                text: text || "Please, wait..."
            })
        }

        hideLoading() {
            this.setState({
                visible: false
            })
        }

        renderProgressDialog() {            
            return (
                <ProgressDialog visible={this.state.visible} message={this.state.text} />
            )
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    renderLoading={this.renderProgressDialog.bind(this)}
                    hideLoading={this.hideLoading.bind(this)}
                    showLoading={this.showLoading.bind(this)}
                />
            );
        }
    }
    LoadingHocComponent.options = WrappedComponent.options;
    return LoadingHocComponent;
};

export default withLoading;