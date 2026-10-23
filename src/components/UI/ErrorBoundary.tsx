import { Component, type ErrorInfo, type ReactNode } from 'react';

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ShopSphere ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="page-shell container centered-page">
          <div className="empty-state">
            <div className="empty-icon">!</div>
            <h2>Something went wrong</h2>
            <p>Refresh the page and try again.</p>
            <button className="button button-dark" onClick={() => window.location.reload()}>Refresh</button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
