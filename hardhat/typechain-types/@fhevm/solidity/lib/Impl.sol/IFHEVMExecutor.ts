/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../../../../common";

export interface IFHEVMExecutorInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "cast"
      | "fheAdd"
      | "fheBitAnd"
      | "fheBitOr"
      | "fheBitXor"
      | "fheDiv"
      | "fheEq"
      | "fheGe"
      | "fheGt"
      | "fheIfThenElse"
      | "fheLe"
      | "fheLt"
      | "fheMax"
      | "fheMin"
      | "fheMul"
      | "fheNe"
      | "fheNeg"
      | "fheNot"
      | "fheRand"
      | "fheRandBounded"
      | "fheRem"
      | "fheRotl"
      | "fheRotr"
      | "fheShl"
      | "fheShr"
      | "fheSub"
      | "trivialEncrypt"
      | "verifyCiphertext"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "cast",
    values: [BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "fheAdd",
    values: [BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "fheBitAnd",
    values: [BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "fheBitOr",
    values: [BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "fheBitXor",
    values: [BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "fheDiv",
    values: [BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "fheEq",
    values: [BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "fheGe",
    values: [BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "fheGt",
    values: [BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "fheIfThenElse",
    values: [BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "fheLe",
    values: [BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "fheLt",
    values: [BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "fheMax",
    values: [BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "fheMin",
    values: [BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "fheMul",
    values: [BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "fheNe",
    values: [BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "fheNeg", values: [BytesLike]): string;
  encodeFunctionData(functionFragment: "fheNot", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "fheRand",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "fheRandBounded",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "fheRem",
    values: [BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "fheRotl",
    values: [BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "fheRotr",
    values: [BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "fheShl",
    values: [BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "fheShr",
    values: [BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "fheSub",
    values: [BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "trivialEncrypt",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "verifyCiphertext",
    values: [BytesLike, AddressLike, BytesLike, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "cast", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fheAdd", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fheBitAnd", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fheBitOr", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fheBitXor", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fheDiv", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fheEq", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fheGe", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fheGt", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "fheIfThenElse",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "fheLe", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fheLt", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fheMax", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fheMin", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fheMul", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fheNe", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fheNeg", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fheNot", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fheRand", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "fheRandBounded",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "fheRem", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fheRotl", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fheRotr", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fheShl", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fheShr", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fheSub", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "trivialEncrypt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verifyCiphertext",
    data: BytesLike
  ): Result;
}

export interface IFHEVMExecutor extends BaseContract {
  connect(runner?: ContractRunner | null): IFHEVMExecutor;
  waitForDeployment(): Promise<this>;

  interface: IFHEVMExecutorInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  cast: TypedContractMethod<
    [ct: BytesLike, toType: BigNumberish],
    [string],
    "nonpayable"
  >;

  fheAdd: TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;

  fheBitAnd: TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;

  fheBitOr: TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;

  fheBitXor: TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;

  fheDiv: TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;

  fheEq: TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;

  fheGe: TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;

  fheGt: TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;

  fheIfThenElse: TypedContractMethod<
    [control: BytesLike, ifTrue: BytesLike, ifFalse: BytesLike],
    [string],
    "nonpayable"
  >;

  fheLe: TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;

  fheLt: TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;

  fheMax: TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;

  fheMin: TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;

  fheMul: TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;

  fheNe: TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;

  fheNeg: TypedContractMethod<[ct: BytesLike], [string], "nonpayable">;

  fheNot: TypedContractMethod<[ct: BytesLike], [string], "nonpayable">;

  fheRand: TypedContractMethod<
    [randType: BigNumberish],
    [string],
    "nonpayable"
  >;

  fheRandBounded: TypedContractMethod<
    [upperBound: BigNumberish, randType: BigNumberish],
    [string],
    "nonpayable"
  >;

  fheRem: TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;

  fheRotl: TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;

  fheRotr: TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;

  fheShl: TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;

  fheShr: TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;

  fheSub: TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;

  trivialEncrypt: TypedContractMethod<
    [ct: BigNumberish, toType: BigNumberish],
    [string],
    "nonpayable"
  >;

  verifyCiphertext: TypedContractMethod<
    [
      inputHandle: BytesLike,
      callerAddress: AddressLike,
      inputProof: BytesLike,
      inputType: BigNumberish
    ],
    [string],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "cast"
  ): TypedContractMethod<
    [ct: BytesLike, toType: BigNumberish],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "fheAdd"
  ): TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "fheBitAnd"
  ): TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "fheBitOr"
  ): TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "fheBitXor"
  ): TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "fheDiv"
  ): TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "fheEq"
  ): TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "fheGe"
  ): TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "fheGt"
  ): TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "fheIfThenElse"
  ): TypedContractMethod<
    [control: BytesLike, ifTrue: BytesLike, ifFalse: BytesLike],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "fheLe"
  ): TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "fheLt"
  ): TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "fheMax"
  ): TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "fheMin"
  ): TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "fheMul"
  ): TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "fheNe"
  ): TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "fheNeg"
  ): TypedContractMethod<[ct: BytesLike], [string], "nonpayable">;
  getFunction(
    nameOrSignature: "fheNot"
  ): TypedContractMethod<[ct: BytesLike], [string], "nonpayable">;
  getFunction(
    nameOrSignature: "fheRand"
  ): TypedContractMethod<[randType: BigNumberish], [string], "nonpayable">;
  getFunction(
    nameOrSignature: "fheRandBounded"
  ): TypedContractMethod<
    [upperBound: BigNumberish, randType: BigNumberish],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "fheRem"
  ): TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "fheRotl"
  ): TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "fheRotr"
  ): TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "fheShl"
  ): TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "fheShr"
  ): TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "fheSub"
  ): TypedContractMethod<
    [lhs: BytesLike, rhs: BytesLike, scalarByte: BytesLike],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "trivialEncrypt"
  ): TypedContractMethod<
    [ct: BigNumberish, toType: BigNumberish],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "verifyCiphertext"
  ): TypedContractMethod<
    [
      inputHandle: BytesLike,
      callerAddress: AddressLike,
      inputProof: BytesLike,
      inputType: BigNumberish
    ],
    [string],
    "nonpayable"
  >;

  filters: {};
}
