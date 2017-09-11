"use strict";
//
const links = { 
  "links": [
    { "yarn": "https://yarnpkg.com/en/docs/cli/" } 
    , { "node-postgres": "https://node-postgres.com/" } 
    , { "qunitjs": "https://qunitjs.com/" } 
    , { 
      "RxJS": 
      "https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/testing.md" 
    } 
    , { "flow": "https://flow.org/" }
    , { "immutable-js": "https://facebook.github.io/immutable-js/" }
    , { "nodejs": "https://nodejs.org/en/docs/guides/simple-profiling/" }
    , { "readline": "https://nodejs.org/api/readline.html" }
  ]
};
//
let read_Line_Str = "";
let read_Line_Arr = [];
// writable._writableState.getBuffer() 
// or readable._readableState.buffer
// The amount of data 
// potentially buffered 
// depends on the highWaterMark option 
// passed into the streams constructor.
//
// Encoding of data is set by socket.setEncoding()
process.stdin
  .setEncoding('utf8');
//$ node -p -e "Boolean(process.stdout.isTTY)" 
//> true
/*
readStream.setRawMode(mode)#
Added in: v0.7.7
Allows configuration of tty.ReadStream 
so that it operates as a raw device.
When in raw mode, 
input is always available character-by-character, 
not including modifiers. 
Additionally, 
all special processing of characters 
by the terminal 
is disabled, 
including 
echoing input characters. 
Note 
  that CTRL+C will no longer cause a SIGINT 
  when in this mode.
mode <boolean> If true, 
configures the tty.ReadStream 
to operate as a raw device. 
If false, 
configures the tty.ReadStream 
to operate in its default mode. 
The readStream.isRaw property will be set 
to the resulting mode.
*/
// '\u001b[D' <- for digits ?
// chars readed one by one  
// and must be implicitly stopped within code or endless input stream
process.stdin
  .setRawMode( true );
process.stdout.write( "Enter password:" );  
// 
//
// Begin reading from stdin 
// so the process does not exit.
//process.stdin.resume();
/*
Unicode Character 'END OF TRANSMISSION' (U+0004)

This octal escape sequences "\033[2K\033D" 
(or hexadecimal escape sequences '\x1B[2K\x1B[200D')
parseInt( "033", 8 );
27
parseInt( "0x1B", 16 );
27
(27).toString(8);
"33"
(27).toString(16);
"1b"
uses two escapes sequences :
Esc [2K : clear entire line.
Esc D : move/scroll window up one line.

<ESC> represents the ASCII "escape" character, 0x1B. 
Bracketed tags represent modifiable decimal parameters; 
eg. {ROW} would be replaced by a row number.
Cursor Control:
Cursor Backward		<ESC>[{COUNT}D
Moves the cursor backward by COUNT columns; the default count is 1.
Cursor Up		<ESC>[{COUNT}A
Moves the cursor up by COUNT rows; the default count is 1.
Erasing Text:
Erase End of Line	<ESC>[K
Erases from the current cursor position to the end of the current line.
Erase Start of Line	<ESC>[1K
Erases from the current cursor position to the start of the current line.
Erase Line		<ESC>[2K
Erases the entire current line.
Erase Up		<ESC>[1J
Erases the screen from the current line up to the top of the screen.
*/
//
// The writable.cork() method 
// forces all written data to be buffered in memory. 
// The buffered data will be flushed 
// when either the stream.uncork() or stream.end() methods are called.
//process.stdin.cork();
// this supress some console outpur
//process.stdout.cork();
//process.stdout.pause();
//
/* The 'readable' event is emitted 
when there is data available 
to be read from the stream. 
In some cases, 
attaching a listener for the 'readable' event 
will cause 
some amount of data 
to be read 
into an internal buffer.
The 'readable' event will also be emitted 
once the end of the stream data has been reached 
but before the 'end' event is emitted.
Effectively, the 'readable' event indicates 
that the stream has new information: 
either new data is available 
or the end of the stream has been reached. 
In the former case, stream.read() will return the available data. 
In the latter case, stream.read() will return null. 
Note: 
  In general, the readable.pipe() and 'data' event mechanisms 
  are easier to understand 
  than the 'readable' event. 
  However, 
  handling 'readable' might result in increased throughput.
*/
process.stdin
  .on(
  //.once(
    'readable', 
    () => {
      //process.stdin.cork();
      //process.stdout.cork();
      //readable
      //process.stdout.pause();
      //process.stdout.write( "\r   \r" );
      // RangeError: Maximum call stack size exceeded
      //process.stdout.end( "\r   \r", 'utf8' );
      const chunk = process.stdin
        .read();
      if ( chunk !== null ) {
        //
        //process.stdin.cork();
        //process.stdout
        // A new string 
        // representing the calling string 
        // stripped of whitespace from both ends.
        let trimed_Chunk = chunk.trim();
        //  .write( 
        /*console.log(  
            `data: ${ trimed_Chunk }` 
          );*/
        //  
        /*
        credentials_Obj.user = process.env.USER;
        credentials_Obj.host = 'localhost';
        credentials_Obj.database = process.env.USER;
        /// @toDo: drop '\n'
        credentials_Obj.password = trimed_Chunk;//.slice( 0, -1 );
        credentials_Obj.port = 5432;
        //
        get_Current_Time( credentials_Obj );
        */
        //  
        // socket.end([data][, encoding])
        // If data is specified, 
        // it is equivalent to calling 
        // socket.write(data, encoding) followed by socket.end()
        /* Calling the writable.end() method signals 
        that no more data will be written to the Writable. 
        The optional 
        chunk 
        and encoding arguments 
        allow 
        one final additional chunk of data 
        to be written immediately 
        before closing the stream. 
        If provided, 
        the optional callback function is attached 
        as a listener for the 'finish' event.
        */
        if( 
          chunk == "\n" ||
          chunk == "\r" ||
          chunk == "\u0004"
        ){
          process.stdout.write( "\n" );
          process.stdin
            .setRawMode( false );
          process.stdin
            // almost the same effect as .end() ?
            //.pause(); /// <- this skips on.end
            .emit('end'); /// <- this invokes on.end
            //.end(); /// <- this skips on.end
            // this produces output to stdout
            //.end( "'read_Line_Str' so far:" + read_Line_Str, 'utf8'); /// <- this skips on.end
        }else{
          read_Line_Str += chunk;
          process.stdout.write(  
            //"\x1B[A" + 
            //"\x1B[K" + 
            //"\r" + 
            //Array( read_Line_Str.length ).join( "*" )  
            "*"
          );  
        }  
      }else{
        /*console.log(  
            "readable data chunk is null|empty" 
          );*/
      }
      //
      //process.stdin
      //  .emit('end');
    }
  );
//
/* with on.readable producess endless loop 
process.stdin
  .on(
    'data', 
    ( chunk ) => { 
      read_Line_Arr.push( chunk );
      // [12, 5, 8, 130, 44].find(isBigEnough); return val|undefined
      // [12, 5, 8, 130, 44].indexOf(2); return index|-1
      // ( new Set([1, 2, 3, 4]) ).has( 42 ): true|false 
      let last_Char = chunk;//"";
      //
      //if( chunk.length >= 1 ){
        last_Char = chunk.charAt( chunk.length - 1 );
      //}
      //
      if( 
        last_Char == "\n" ||
        chunk == "\r" ||
        last_Char == "\u0004"
      ){
        process.stdin
          .pause();
          // stdin.on.end [ '42\n' ];
          //.end( read_Line_Arr.toString() );
        //
        credentials_Obj.user = process.env.USER;
        credentials_Obj.host = 'localhost';
        credentials_Obj.database = process.env.USER;
        credentials_Obj.password = read_Line_Str.trim();
        credentials_Obj.port = 5432;
        //
        get_Current_Time( credentials_Obj );
      }else{
        read_Line_Str += chunk;
        process.stdout.write( 
          //"\r*******" 
          // Octal escape sequences are not allowed in strict mode
          //"\0o33[2K\0o33[200D" + 
          //Erase Up		<ESC>[1J
          // <ESC>[K Erases from the current cursor position to the end of the current line.
          // Cursor Up		<ESC>[{COUNT}A
          //"\x1B[1j" + 
          //"\x1B[A" + 
          //"\x1B[K" + 
          "\r" + 
          Array( read_Line_Str.length ).join( "*" )
        );
      }
      //process.stdout.resume();
    }
  );
*/  
// to copy process.stdin to process.stdout:
//  process.stdin.pipe(process.stdout);
process.stdin
  .on(
    'end', 
    () => {
      credentials_Obj.user = process.env.USER;
      credentials_Obj.host = 'localhost';
      credentials_Obj.database = process.env.USER;
      credentials_Obj.password = read_Line_Str.trim();
      credentials_Obj.port = 5432;
      //
      get_Current_Time( credentials_Obj );
      //process.stdout
      //  .write( 
      console.log(  
          "stdin.on.end", read_Line_Arr 
        );
    }
  );
/*  
console.log( 
  "process.stdin.listenerCount( 'readable'):", 
  process.stdin.listenerCount( 'readable') );  
console.log( 
  "process.stdin.listenerCount( 'end'):", 
  process.stdin.listenerCount( 'end') );  
*/  
// POSIX Signal Events
// Note: 
//  An easy way to send the SIGINT signal is 
//  with <Ctrl>-C in most terminal programs.
// EOT stands for <Ctrl>-D 
process.on('SIGINT', () => {
  console.log('Received SIGINT. Press Control-D to exit.');
});
// or 
//stdin.on('keypress', function(char, key) {
//  if (key && key.ctrl && key.name == 'c') {
//  
process.on( 'uncaughtException', function(e) {
  let red = "";
  console.log( e.stack );
});
//writer
process.stdout
  .on(
    'error', 
    ( err ) => { 
      console.log( "stdout.on.error:", err ); 
    }
  );
/// this halts|brings all console input in endless loop mode
/*
process.stdout
  .on(
    'data', 
    ( chunk ) => { 
      console.log( "stdout.on.data:", chunk.toString() ); 
      process.stdout.resume();
    }
  );
*/  
// The 'finish' event is emitted 
// after the stream.end() method has been called, 
// and all data has been flushed to the underlying system.
process.stdout
  .on(
    'end', 
    () => {
      //process.stdout
      //  .write( 
      console.log(  
          "stdout.on.end" 
        );
    }
  );
process.stdout
  .on(
     'pipe', 
     ( src ) => {
      console.error( 'something is piping into the writer' );
      //assert.equal(src, reader);
    }
  );
// write some more once it drains
// writer.once('drain', write);  
// If a call to stream.write(chunk) returns false, 
// the 'drain' event will be emitted 
// when it is appropriate 
// to resume writing data to the stream.
process.stdout
  .on(
     'drain', 
     ( src ) => {
      console.log( 'stdout writer drain event' );
    }
  );
// also see|use: "https://github.com/npm/read"  
// for hiding password
/*
const readline = require('readline');
//
// process.stdin 
// and process.stdout are both instances of Streams
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
//
rl.question(
  'Why should you use streams? ', 
  (answer) => {
    console.log(
      `Maybe it's ${answer}, 
maybe it's because they are awesome! :)`
    );
    //
    rl.close();
  }
);
*/
/*
To run the program 
and specify 
which database to connect to 
we can invoke it like so:
$ PGUSER=dbuser \
  PGHOST=database.server.com \
  PGPASSWORD=secretpassword \
  PGDATABASE=mydb \
  PGPORT=3211 \
  node script.js

The default values 
for the environment variables used are:
  PGHOST='localhost'
  PGUSER=process.env.USER // <- $ node -p process.env.USER
  PGDATABASE=process.env.USER // -p, --print "script"
  PGPASSWORD=null
  PGPORT=5432
  
This allows us 
to write our programs 
without having to 
specify connection information in the program 
and lets us reuse them 
to connect 
to different databases 
without having to modify the code.
*/
const { Pool, Client } = require('pg');
// or 
// for use as parameter 
// in constructors of\for Pool, Client
const credentials_Obj = {
  user: 'dbuser',
  host: 'database.server.com',
  database: 'mydb',
  password: 'secretpassword',
  port: 3211,
};
// or 
/* by: "https://github.com/iceddev/pg-connection-string"
var parse = require('pg-connection-string').parse;
var config = parse('postgres://someuser:somepassword@somehost:381/somedatabase')
*/
const connection_URI_Str = (
  'postgresql://dbuser:secretpassword@database.server.com:3211/mydb' 
);
const connection_URI_Obj = {
  connectionString: connection_URI_Str,
};
//
function get_Current_Time(
  connection_Obj = credentials_Obj
  , is_DeBug_Mode = 1 == 0
){
  if( is_DeBug_Mode ){
    console.log( "connection_Obj:", connection_Obj );
  }
  // pools will use environment variables
  // for connection information
  // error: password authentication failed for user "gluk-alex"
  //const pool = new Pool();
  const pool = new Pool( connection_Obj );
  // clients will also use environment variables
  // for connection information
  //const client = new Client();
  //
  pool
    .query(
      //'SELECT NOW()', 
      //'SELECT * FROM test;', 
      {
        text: (
          //'SELECT * FROM test'
          'SELECT Count(*) FROM test'
        ),
        //values: ['Brian', 'Carlson'],
        rowMode: 'array',
      },
      ( err, res ) => {
      //console.log( err, res );
      console.log( "query.err:", err );
      console.log( "query.res:", res );
      if ( err == undefined ){
        if( is_DeBug_Mode || 1 == 1 ){
          console.log( 
            // from: 
            // "https://nodejs.org/dist/latest-v6.x/docs/api/util.html#util_util_format_format_args"
            // %j - JSON. Replaced with the string '[Circular]' 
            //      if the argument contains circular references.
            "rowCount:%d, rows:%j, rows[0]:%j, rows[0][0]:%s", 
            // Result
            res.rowCount, 
            res.rows 
            , res.rows[0] 
            , res.rows[0][0] 
          );
        }        
      }
      // finally 
      pool.end();
    }
  );
}
/// *************************************
// Promises allow us to use async/await 
// in node v8.0 and above 
// (or earlier if you're using babel).
/// *************************************
/*
async function select_Hello() {
  // The `await` operator is used to wait for a Promise. 
  // It can only be used inside an 'async function'.
  await client.connect();
  //
  const res = await client
    .query(
      'SELECT $1::text as message', ['Hello world!']
    );
  console.log( res.rows[0].message ); 
  // Hello world!
  await client.end();
}
select_Hello();
*/
// Query config object
const query_Obj_INSERT = {
  text: 'INSERT INTO users(name, email) VALUES($1, $2)',
  values: ['brianc', 'brian.m.carlson@gmail.com'],
};
/* the client.query and the pool.query - 
both methods support the same API. 
In fact, 
pool.query delegates directly to client.query internally.
*/
/*
// callback
client.query(query, (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log(res.rows[0])
  }
});
*/
/*
Prepared statements:
===
PostgreSQL has the concept of a prepared statement. 
node-postgres supports this 
by supplying a name parameter 
to the query config object. 
If you supply a name parameter 
the query execution plan will be cached 
on the PostgreSQL server 
on a per connection basis. 
This means 
if you use two different connections 
each will have to parse & plan the query once. 
node-postgres handles this transparently for you: 
a client only requests a query 
to be parsed the first time 
that particular client 
has seen that query name .

Note:
  Be careful 
  not to fall into the trap of premature optimization. 
  Most of your queries will likely not benefit much, 
  if at all, 
  from using prepared statements. 
  This is a somewhat "power user" feature of PostgreSQL 
  that is best used 
  when you know how to use it - namely 
  with very complex queries 
  with lots of joins 
  and advanced operations 
  like union 
  and switch statements. 
  I rarely use this feature 
  in my own apps 
  unless writing complex aggregate queries 
  for reports 
  and I know 
  the reports are going to be executed very frequently.
*/
/// so, it is sort of a stored procedure ? 
const query_Obj_Prepared = {
  // give the query a unique name
  name: 'fetch-user',
  text: 'SELECT * FROM user WHERE id = $1',
  values: [1]
};
/*
// callback
client.query(query, (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log(res.rows[0])
  }
});
*/
/*
Row mode
---
By default 
node-postgres reads rows 
and collects them 
into JavaScript objects 
with the keys matching the column names 
and the values matching the corresponding row value for each column. 
If you do not need 
or do not want this behavior 
you can pass 
rowMode: 'array' 
to a query object. 
This will inform 
the result parser 
to bypass collecting rows 
into a JavaScript object, 
and instead 
will return 
each row as 
an array of values.
*/
const query_Obj_Row_Arr = {
  text: 'SELECT $1::text as first_name, select $2::text as last_name',
  values: ['Brian', 'Carlson'],
  rowMode: 'array',
};
/*
// callback
client.query(query, (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log(res.fields.map(f => field.name)) // ['first_name', 'last_name']
    console.log(res.rows[0]) // ['Brian', 'Carlson']
  }
});
*/