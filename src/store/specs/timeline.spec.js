// Tests
// => Should test behaviour not the implimentation.
// Tests shouldn't know implimentation details. (Implimentation can change in future.)
// Follow AAA principle (Arrange, Act, Assert)

// Solitary Tests
// => Poor way of testing -> coupled, -> Break often, -> Know too much implimentation

import configureStore from "../configureStore";
import { fetchTimelineItems } from "../Timeline";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

describe("Timeline Items", () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  const getFeedItemsFromState = () => store.getState().entities.timeline;

  it("should add the feed items to store when fetched", async () => {
    fakeAxios.onGet("/api/feeds").reply(200, {
      next: {},
      per_page_items: 10,
      results: [],
      total_items: 100,
    });

    await store.dispatch(fetchTimelineItems());

    expect(getFeedItemsFromState().feedItems).toHaveLength(1);
  });

  it("should not add the feed items to store when fetched fails", async () => {
    fakeAxios.onGet("/api/feeds").reply(500);

    await store.dispatch(fetchTimelineItems());

    expect(getFeedItemsFromState().feedItems).toHaveLength(0);
  });

  describe("Loading indicator", () => {
    it("should be true when fetching the items", () => {
      fakeAxios.onGet("/api/feeds").reply(() => {
        expect(getFeedItemsFromState().loading).toBe(true);
        return [200, { items: [] }];
      });

      store.dispatch(fetchTimelineItems());
    });

    it("should be false after fetching the items", async () => {
      fakeAxios.onGet("/api//feeds").reply(200, { items: [{ id: 1 }] });

      await store.dispatch(fetchTimelineItems());

      expect(getFeedItemsFromState().loading).not.toBe(true);
    });

    it("should be false if the server return an error", async () => {
      fakeAxios.onGet("/api/feeds").reply(500);

      await store.dispatch(fetchTimelineItems());

      expect(getFeedItemsFromState().loading).not.toBe(true);
    });
  });
});
