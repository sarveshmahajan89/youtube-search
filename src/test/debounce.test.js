import { debounce } from "../utils/debounce";

jest.useFakeTimers();

describe('debounce', () => {
    let callback;

    beforeEach(() => {
        callback = jest.fn();
        jest.clearAllTimers();
    });

    it('should call the debounced function after 500 delay', () => {
        const delay = 500;
        const debouncedFunc = debounce(callback, delay);

        debouncedFunc();

        expect(callback).not.toHaveBeenCalled();
        jest.advanceTimersByTime(delay);
        expect(callback).toHaveBeenCalledTimes(1);
    });


    it('should only call the function once for rapid successive calls', () => {
        const delay = 300;
        const debouncedFunc = debounce(callback, delay);

        debouncedFunc();
        debouncedFunc();
        debouncedFunc();

        expect(callback).not.toHaveBeenCalled();
        jest.advanceTimersByTime(delay);
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should pass the correct arguments to the callback', () => {
        const delay = 400;
        const debouncedFunc = debounce(callback, delay);

        debouncedFunc('arg1', 123);
        jest.advanceTimersByTime(delay);
        expect(callback).toHaveBeenCalledWith('arg1', 123);
    });


});