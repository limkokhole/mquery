import React, {Component} from 'react';
import ErrorBoundary from './ErrorBoundary';
import BackendStatus from './BackendStatus';
import DatabaseTopology from './DatabaseTopology';
import CompactButton from './CompactButton';
import VersionStatus from './VersionStatus'
import axios from 'axios';
import {API_URL} from "./config";

class StatusPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            backend: {
                tasks: [],
                components: [],
            },
            error: null
        }
    }

    componentDidMount() {
        axios
            .get(API_URL + "/backend")
            .then(response => {
                this.setState({"backend": response.data});
            })
            .catch(error => {
                this.setState({"error": error});
            });
    }

    render() {
        return (
            <ErrorBoundary error={this.state.error}>
                <div className="container-fluid">
                    <h1 className="text-center mq-bottom">Status</h1>
                    <div className="row">
                        <div className="col-md-6">
                        </div>
                        <div className="col-md-6">
                             <CompactButton />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <h2 className="text-center mq-bottom">current connections</h2>
                            <BackendStatus jobs={this.state.backend.tasks} />
                            <h2 className="text-center mq-bottom">system version</h2>
                            <VersionStatus components={this.state.backend.components} />
                        </div>
                        <div className="col-md-6">
                            <h2 className="text-center mq-bottom">topology</h2>
                            <DatabaseTopology />
                        </div>
                    </div>
                </div>
            </ErrorBoundary>
        );
    }
}

export default StatusPage;