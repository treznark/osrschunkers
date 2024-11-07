import { ObjectId } from 'mongodb';

type Transformable = Record<string, unknown>;
type VisitedMap = WeakMap<object, object | unknown[]>;

export function isObjectId(value: unknown): value is ObjectId {
  // console.log(`Checking if value is ObjectId: ${value}`);
  return value instanceof ObjectId;
}

function _transformObjectIds<T>(input: T, visited: VisitedMap = new WeakMap(), path: string = 'root'): T {
  // console.log(`Transforming at path: ${path}`);

  if (typeof input !== 'object' || input === null) {
    // console.log(`Non-object or null value encountered at path ${path}: ${input}`);
    return input;
  }

  if (visited.has(input)) {
    // console.log(`Circular reference detected at path ${path}. Returning previously visited object/array.`);
    return visited.get(input) as T;
  }

  if (Array.isArray(input)) {
    const clone: unknown[] = [];
    visited.set(input, clone);
    // console.log(`Array encountered at path ${path}, processing elements.`);
    input.forEach((item, index) => {
      clone[index] = _transformObjectIds(item, visited, `${path}[${index}]`);
    });
    return clone as T;
  } else {
    const clone: Transformable = {};
    visited.set(input, clone);
    // console.log(`Object encountered at path ${path}, processing properties.`);
    Object.entries(input as Transformable).forEach(([key, value]) => {
      // console.log(`Processing key '${key}' at path ${path}.${key}`);
      clone[key] = isObjectId(value) ? (value as ObjectId).toString() : _transformObjectIds(value, visited, `${path}.${key}`);
      // console.log(`Completed key '${key}' at path ${path}.${key}`);
    });
    return clone as T;
  }
}

export function transformObjectIds<T extends Transformable | unknown[]>(obj: T): T {
  // console.log("Starting ObjectId conversion.");
  const result = _transformObjectIds(obj);
  // console.log("Completed ObjectId conversion.");
  return result;
}


// import _ from 'lodash';
// import { ObjectId } from 'mongodb';

// type Transformable = { [key: string]: unknown };

// export function isObjectId(value: unknown): value is ObjectId {
//   return value instanceof ObjectId;
// }

// function isTransformable(value: unknown): value is Transformable {
//   return _.isObject(value) && !_.isFunction(value);
// }

// export function _transformObjectIds<T extends Transformable>(obj: T): T {
//   function transformObject(value: unknown): unknown {
//     if (Array.isArray(value)) {
//       return value.map(item => transformObject(item));
//     }

//     if (isTransformable(value)) {
//       return _.transform(value, (result: Transformable, v, key) => {
//         if (isObjectId(v)) {
//           result[key as keyof typeof result] = v?.toString();
//         } else {
//           result[key as keyof typeof result] = transformObject(v);
//         }
//       });
//     }

//     return value;
//   }

//   return transformObject(obj) as T;
// }