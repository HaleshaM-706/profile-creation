import React from 'react';
import { Provider } from 'react-native-paper';
// import theme from '../theme';
const withPaperProvider = (WrappedComponent: any) => {
    class HOC extends React.Component {
        render() {
            return (
                <Provider>
                    <WrappedComponent {...this.props} />
                </Provider>
            );
        }
    }

    return HOC;
};

export default withPaperProvider;