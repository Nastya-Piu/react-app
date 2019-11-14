import React from 'react';
import { create } from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, render } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import App from '../components/App';


configure({adapter: new Adapter()});

const mockStore = configureMockStore();
const store = mockStore({});

describe("App component", () => {
  it("Find header", () => {
    expect(
      render(
        <Provider store={store}>
          <App />
        </Provider>
      ).find('.blog-header')
    ).toHaveLength(1);
  });

  it("Finds h4", () => {
    expect(
      render(
        <Provider store={store}>
          <App />
        </Provider>
      ).find(<h4>About me</h4>)
    ).toHaveLength(1);
  });
});