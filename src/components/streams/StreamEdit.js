import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSumbit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues);
    };

    render() {
        if (!this.props.stream) {
            return (
                <div>
                    <div className="ui active centered inline loader"></div>
                </div>
            );
        }
        return (
            <div>
                <h3>Edit Stream</h3>
                <StreamForm
                    initialValues={_.pick(this.props.stream, 'title', 'description')} // Using _.pick to select which exact values to pass down from the parent object
                    onSubmit={this.onSumbit} />
            </div>
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);