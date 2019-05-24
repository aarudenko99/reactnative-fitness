import React, {Component, Fragment} from "react";
import TabPage from "./page/Main";
import Welcome from "./page/Welcome";
import MyLoading from './component/MyLoading';

class _Root extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showWelcome: true,
        };
    }

    changeShowWelcome = bool => {
        this.setState({
            showWelcome: bool,
        });
    };

    render() {
        return (
            <Fragment>
                {this.state.showWelcome ? (
                    <Welcome
                        fontLoaded={this.props.fontLoaded}
                        changeShowWelcome={this.changeShowWelcome}
                    />
                ) : (
                    <TabPage fontLoaded={this.props.fontLoaded}/>
                )}
                {<MyLoading
                    ref={(ref) => {
                        global.mLoadingComponentRef = ref;
                    }}
                />}
            </Fragment>
        );
    }
}

export const Root = _Root;
