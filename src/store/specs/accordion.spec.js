// Tests
// => Should test behaviour not the implimentation.
// Tests shouldn't know implimentation details. (Implimentation can change in future.)
//

// Solitary Tests
// => Poor way of testing -> coupled, -> Break often, -> Know too much implimentation

import configureStore from "../configureStore";
import {
  updateProCheckboxState,
  getSelectedPros,
  getSelectedFeedTypes,
} from "../Accordion";

describe("Accordion Items", () => {
  it("Should update uncheck state in store", () => {
    const store = configureStore();
    const newCheckState = false;
    const targetProItemSlug = "azad-kashmir";
    const pro = { slug: targetProItemSlug, checked: newCheckState };
    store.dispatch(updateProCheckboxState(pro));

    const proItems = store.getState().entities.accordion.proItems;
    const expectedItemIndex = proItems.findIndex(
      (pro) => pro.slug === targetProItemSlug
    );
    expect(proItems[expectedItemIndex].selected).toEqual(newCheckState);
  });
  describe("Selectors", () => {
    const createState = () => {
      return {
        entities: { accordion: { proItems: [], feedTypeItems: [] } },
      };
    };
    it("getSelectedPros", () => {
      const state = createState();
      state.entities.accordion.proItems = [
        { selected: true },
        { selected: false },
      ];
      const result = getSelectedPros(state);

      expect(result).toHaveLength(1);
    });

    it("feedTypeItems", () => {
      const state = createState();
      state.entities.accordion.feedTypeItems = [
        { selected: true },
        { selected: false },
      ];
      const result = getSelectedFeedTypes(state);

      expect(result).toHaveLength(1);
    });
  });
});
