// Задание 1 (Работа с синхронными и асинхронными методами)
// Реализуйте функцию удаления нечетных чисел из одномерного массива натуральных чисел. После удаления одного из таких чисел,
// следует подождать 1 секунду до удаления следующего. Операции удаления следует показывать в консоли

const removeOddNumbers = async (arrayNum: number[]): Promise<number[]> => {
    const filteredNumbers: number[] = [];

    for (const number of arrayNum) {
        if (number % 2 === 0) {
            filteredNumbers.push(number);
        } else {
            console.log(`Удалено число: ${number}`);
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    }

    return filteredNumbers;
}

removeOddNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9])

// Задание 2 (замыкания)
// Реализуйте на ваш выбор функцию, которая возвращает функцию, которая в свою в свою очередь пишет результат в консоль некоторую строку. Вызвать
// данные функции, показав принцип работы замыканий.

const printMessage = (message: string): void => {
    console.log(message);
};

const createMessage = (message: string): (() => void) => {
    return () => {
        printMessage(message);
    };
};

const message = createMessage("Замыкание");
message();

// Задание 3 (декораторы класса)
// Создайте декоратор, выполняющий блокировку изменения прототипа класса автомобиль. Необходимо проверить, осталась ли возможность добавления
// сторонних полей в объект после введения декоратора (проверка работоспособности).
const sealed = (constructor: Function) => {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
};

// Задание 4 (декоратор метода)
// Реализуйте декоратор метода, выполняющий преобразование возвращаемой строки с некими сведениями об объекте класса Автомобиль, заменяя все
// буквы на ЗАГЛАВНЫЕ.
const toUppercase = (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) => {
    const originalMethod = descriptor.value;

    descriptor.value = (...args: any[]) => {
        const result = originalMethod.apply(this, args);
        if (typeof result === 'string') {
            return result.toUpperCase();
        }
        return result;
    };

    return descriptor;
};

interface ICar {
    brand: string;
    model: string;
    releaseYear: number;
    VIN: string;
    registrationNumber: string;

    getInfo(): string;
}

@sealed
class Car implements ICar {
    private _brand: string;
    private _model: string;
    private _releaseYear: number;
    private _VIN: string;
    private _registrationNumber: string;

    constructor(
        brand: string,
        model: string,
        releaseYear: number,
        VIN: string,
        registrationNumber: string,
    ) {
        this._brand = brand;
        this._model = model;
        this._releaseYear = releaseYear;
        this._VIN = VIN;
        this._registrationNumber = registrationNumber;
    }

    public get brand(): string {
        return  this._brand;
    }
    public get model(): string {
        return  this._model;
    }
    public get releaseYear(): number {
        return  this._releaseYear;
    }
    public get VIN(): string {
        return  this._VIN;
    }
    public get registrationNumber(): string {
        return  this._registrationNumber;
    }
    public set brand(brand: string) {
        this._brand = brand;
    }
    public set model(model: string) {
        this._model = model;
    }
    public set releaseYear(releaseYear: number) {
        this._releaseYear = releaseYear;
    }
    public set VIN(VIN: string) {
        this._VIN = VIN;
    }
    public set registrationNumber(registrationNumber: string) {
        this._registrationNumber = registrationNumber;
    }

    @toUppercase
    public getInfo(): string {
       return `Марка: ${this._brand}; Модель: ${this._model}; 
        Год выпуска: ${this._releaseYear}; VIN: ${this._VIN}; 
        Регистрационный номер: ${this._registrationNumber};`;
    }
}

const car = new Car(
    "Toyota",
    "Camry",
    2020,
    "1HGCM82633A123456",
    "A123BC",
);

console.log(car.getInfo());

Object.defineProperty(Car, 'owner', {value: "Иванов Иван Иванович"});
