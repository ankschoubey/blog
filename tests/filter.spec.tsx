// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import React from 'react';
import { LatencySection } from '../src/components/custom/LatencySection';
import { LocationOrder } from '../src/data/latency-entries';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const store: Record<string, string> = {};
globalThis.localStorage = {
  getItem: (k: string) => (k in store ? store[k] : null),
  setItem: (k: string, v: string) => {
    store[k] = String(v);
  },
  removeItem: (k: string) => {
    delete store[k];
  },
  clear: () => {
    for (const k in store) delete store[k];
  },
  key: (i: number) => Object.keys(store)[i] ?? null,
  get length() {
    return Object.keys(store).length;
  },
} as Storage;

function allFalse() {
  const obj: Record<string, boolean> = {};
  for (const l of LocationOrder) obj[l] = false;
  return obj;
}

beforeEach(() => {
  store['numbers-grid-filter'] = JSON.stringify(allFalse());
});

describe('LatencySection filter', () => {
  it('when all unchecked, selecting one shows only that one', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(React.createElement(LatencySection));
    });

    const checkboxes = Array.from(
      container.querySelectorAll('input[type=checkbox]'),
    ) as HTMLInputElement[];
    expect(checkboxes.length).toBe(LocationOrder.length);
    expect(checkboxes.every((c) => !c.checked)).toBe(true);

    // select the very first one
    const target = checkboxes[0];
    act(() => {
      target.click();
    });

    expect(target.checked).toBe(true);
    expect(checkboxes.filter((c) => c.checked).length).toBe(1);

    const summary = container.querySelector('p.text-xs.text-gray-500.mt-3');
    expect(summary?.textContent).toContain('1 / ' + LocationOrder.length);

    root.unmount();
  });

  it('unchecking all then selecting one keeps it visible (no mass-hide)', () => {
    // start from default (all true), uncheck everything, then select one
    delete store['numbers-grid-filter'];

    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(React.createElement(LatencySection));
    });

    let checkboxes = Array.from(
      container.querySelectorAll('input[type=checkbox]'),
    ) as HTMLInputElement[];
    // all start checked (default)
    expect(checkboxes.every((c) => c.checked)).toBe(true);

    // uncheck all
    for (const c of checkboxes) {
      act(() => {
        c.click();
      });
    }
    checkboxes = Array.from(
      container.querySelectorAll('input[type=checkbox]'),
    ) as HTMLInputElement[];
    expect(checkboxes.every((c) => !c.checked)).toBe(true);

    // select first
    const target = checkboxes[0];
    act(() => {
      target.click();
    });
    expect(target.checked).toBe(true);
    expect(checkboxes.filter((c) => c.checked).length).toBe(1);

    root.unmount();
  });
});
