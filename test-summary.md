
# Test Summary

## Linting

```

> estudiar-mucho@0.1.0 lint
> eslint


/home/fer/Documents/Dev/estudiar-mucho/app/[locale]/collections/page.tsx
  34:9  error  'filtered' is never reassigned. Use 'const' instead                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           prefer-const
  44:5  error  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

/home/fer/Documents/Dev/estudiar-mucho/app/[locale]/collections/page.tsx:44:5
  42 |     });
  43 |
> 44 |     setFilteredCollections(filtered);
     |     ^^^^^^^^^^^^^^^^^^^^^^ Avoid calling setState() directly within an effect
  45 |   }, [searchTerm, sortOrder, collections]);
  46 |
  47 |   const handleEdit = (collection: Collection) => {  react-hooks/set-state-in-effect

/home/fer/Documents/Dev/estudiar-mucho/app/__tests__/file.test.ts
  4:10  warning  'createClient' is defined but never used  @typescript-eslint/no-unused-vars

/home/fer/Documents/Dev/estudiar-mucho/app/__tests__/setup.ts
  11:12  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/fer/Documents/Dev/estudiar-mucho/app/__tests__/supabase.test.ts
  4:10  warning  'User' is defined but never used  @typescript-eslint/no-unused-vars

/home/fer/Documents/Dev/estudiar-mucho/app/components/layout/Navbar.tsx
  24:5  error  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

/home/fer/Documents/Dev/estudiar-mucho/app/components/layout/Navbar.tsx:24:5
  22 |
  23 |   useEffect(() => {
> 24 |     setMounted(true);
     |     ^^^^^^^^^^ Avoid calling setState() directly within an effect
  25 |     AuthService.onAuthStateChanged(setUser);
  26 |   }, []);
  27 |  react-hooks/set-state-in-effect

/home/fer/Documents/Dev/estudiar-mucho/app/i18n-provider.tsx
  5:10  warning  'useParams' is defined but never used  @typescript-eslint/no-unused-vars

/home/fer/Documents/Dev/estudiar-mucho/app/lib/supabase/server.ts
  19:20  warning  'error' is defined but never used  @typescript-eslint/no-unused-vars
  28:20  warning  'error' is defined but never used  @typescript-eslint/no-unused-vars

/home/fer/Documents/Dev/estudiar-mucho/app/services/auth.ts
  55:26  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/home/fer/Documents/Dev/estudiar-mucho/public/pdf.worker.js
     38:12   error    Do not assign to the variable `module`. See: https://nextjs.org/docs/messages/no-assign-module-variable  @next/next/no-assign-module-variable
    370:12   warning  'e' is defined but never used                                                                            @typescript-eslint/no-unused-vars
    400:12   warning  'ex' is defined but never used                                                                           @typescript-eslint/no-unused-vars
    622:12   warning  'e' is defined but never used                                                                            @typescript-eslint/no-unused-vars
   1001:41   warning  'reject' is defined but never used                                                                       @typescript-eslint/no-unused-vars
   1037:7    error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
   1139:79   warning  'transfers' is defined but never used                                                                    @typescript-eslint/no-unused-vars
   1140:9    error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
   1191:9    error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
   1193:9    error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
   1280:9    error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
   1479:25   warning  'exports' is defined but never used                                                                      @typescript-eslint/no-unused-vars
   1479:34   warning  '__w_pdfjs_require__' is defined but never used                                                          @typescript-eslint/no-unused-vars
   1489:34   warning  '__w_pdfjs_require__' is defined but never used                                                          @typescript-eslint/no-unused-vars
   1727:25   warning  'exports' is defined but never used                                                                      @typescript-eslint/no-unused-vars
   1727:34   warning  '__w_pdfjs_require__' is defined but never used                                                          @typescript-eslint/no-unused-vars
   2456:72   warning  'req' is defined but never used                                                                          @typescript-eslint/no-unused-vars
   2491:64   warning  'length' is defined but never used                                                                       @typescript-eslint/no-unused-vars
   2515:70   warning  'req' is defined but never used                                                                          @typescript-eslint/no-unused-vars
   2885:25   warning  'exports' is defined but never used                                                                      @typescript-eslint/no-unused-vars
   2885:34   warning  '__w_pdfjs_require__' is defined but never used                                                          @typescript-eslint/no-unused-vars
   2983:25   warning  'exports' is defined but never used                                                                      @typescript-eslint/no-unused-vars
   2983:34   warning  '__w_pdfjs_require__' is defined but never used                                                          @typescript-eslint/no-unused-vars
   2991:12   warning  'e' is defined but never used                                                                            @typescript-eslint/no-unused-vars
   2998:25   warning  'exports' is defined but never used                                                                      @typescript-eslint/no-unused-vars
   2998:34   warning  '__w_pdfjs_require__' is defined but never used                                                          @typescript-eslint/no-unused-vars
   3068:12   warning  'e' is defined but never used                                                                            @typescript-eslint/no-unused-vars
   3093:19   warning  Expected an assignment or function call and instead saw an expression                                    @typescript-eslint/no-unused-expressions
   3095:19   warning  Expected an assignment or function call and instead saw an expression                                    @typescript-eslint/no-unused-expressions
   3112:25   warning  'exports' is defined but never used                                                                      @typescript-eslint/no-unused-vars
   3112:34   warning  '__w_pdfjs_require__' is defined but never used                                                          @typescript-eslint/no-unused-vars
   3125:25   warning  'exports' is defined but never used                                                                      @typescript-eslint/no-unused-vars
   3125:34   warning  '__w_pdfjs_require__' is defined but never used                                                          @typescript-eslint/no-unused-vars
   3150:25   warning  'exports' is defined but never used                                                                      @typescript-eslint/no-unused-vars
   3150:34   warning  '__w_pdfjs_require__' is defined but never used                                                          @typescript-eslint/no-unused-vars
   3159:25   warning  'exports' is defined but never used                                                                      @typescript-eslint/no-unused-vars
   3159:34   warning  '__w_pdfjs_require__' is defined but never used                                                          @typescript-eslint/no-unused-vars
   3168:25   warning  'exports' is defined but never used                                                                      @typescript-eslint/no-unused-vars
   3168:34   warning  '__w_pdfjs_require__' is defined but never used                                                          @typescript-eslint/no-unused-vars
   3194:25   warning  'exports' is defined but never used                                                                      @typescript-eslint/no-unused-vars
   3194:34   warning  '__w_pdfjs_require__' is defined but never used                                                          @typescript-eslint/no-unused-vars
   3208:25   warning  'exports' is defined but never used                                                                      @typescript-eslint/no-unused-vars
   3208:34   warning  '__w_pdfjs_require__' is defined but never used                                                          @typescript-eslint/no-unused-vars
   3287:48   warning  'src' is defined but never used                                                                          @typescript-eslint/no-unused-vars
   3287:53   warning  'srcOffset' is defined but never used                                                                    @typescript-eslint/no-unused-vars
   3287:64   warning  'dest' is defined but never used                                                                         @typescript-eslint/no-unused-vars
   3287:70   warning  'destOffset' is defined but never used                                                                   @typescript-eslint/no-unused-vars
   3290:52   warning  'src' is defined but never used                                                                          @typescript-eslint/no-unused-vars
   3290:57   warning  'srcOffset' is defined but never used                                                                    @typescript-eslint/no-unused-vars
   3290:68   warning  'count' is defined but never used                                                                        @typescript-eslint/no-unused-vars
   3290:75   warning  'dest' is defined but never used                                                                         @typescript-eslint/no-unused-vars
   3290:81   warning  'destOffset' is defined but never used                                                                   @typescript-eslint/no-unused-vars
   3290:93   warning  'bits' is defined but never used                                                                         @typescript-eslint/no-unused-vars
   3290:99   warning  'alpha01' is defined but never used                                                                      @typescript-eslint/no-unused-vars
   3293:58   warning  'inputLength' is defined but never used                                                                  @typescript-eslint/no-unused-vars
   3293:71   warning  'alpha01' is defined but never used                                                                      @typescript-eslint/no-unused-vars
   3296:54   warning  'bits' is defined but never used                                                                         @typescript-eslint/no-unused-vars
   3664:57   warning  'decodeMap' is defined but never used                                                                    @typescript-eslint/no-unused-vars
   4149:53   warning  'decodeMap' is defined but never used                                                                    @typescript-eslint/no-unused-vars
   4160:34   warning  '__w_pdfjs_require__' is defined but never used                                                          @typescript-eslint/no-unused-vars
   4205:25   warning  'exports' is defined but never used                                                                      @typescript-eslint/no-unused-vars
   4205:34   warning  '__w_pdfjs_require__' is defined but never used                                                          @typescript-eslint/no-unused-vars
   4262:12   warning  'e' is defined but never used                                                                            @typescript-eslint/no-unused-vars
   5319:25   warning  'exports' is defined but never used                                                                      @typescript-eslint/no-unused-vars
   5319:34   warning  '__w_pdfjs_require__' is defined but never used                                                          @typescript-eslint/no-unused-vars
   5344:25   warning  'exports' is defined but never used                                                                      @typescript-eslint/no-unused-vars
   5344:34   warning  '__w_pdfjs_require__' is defined but never used                                                          @typescript-eslint/no-unused-vars
   5446:10   warning  'e' is defined but never used                                                                            @typescript-eslint/no-unused-vars
   5460:12   warning  'e' is defined but never used                                                                            @typescript-eslint/no-unused-vars
  10172:26   warning  Expected an assignment or function call and instead saw an expression                                    @typescript-eslint/no-unused-expressions
  10175:7    warning  Expected an assignment or function call and instead saw an expression                                    @typescript-eslint/no-unused-expressions
  10501:12   warning  'e' is defined but never used                                                                            @typescript-eslint/no-unused-vars
  10507:34   warning  '__w_pdfjs_require__' is defined but never used                                                          @typescript-eslint/no-unused-vars
  10681:25   warning  'exports' is defined but never used                                                                      @typescript-eslint/no-unused-vars
  10681:34   warning  '__w_pdfjs_require__' is defined but never used                                                          @typescript-eslint/no-unused-vars
  10972:11   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  10980:11   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  11590:11   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  11607:11   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  11763:16   warning  'e' is defined but never used                                                                            @typescript-eslint/no-unused-vars
  12340:63   warning  'suppressEncryption' is defined but never used                                                           @typescript-eslint/no-unused-vars
  12393:11   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  12415:29   warning  'root' is defined but never used                                                                         @typescript-eslint/no-unused-vars
  12415:35   warning  'xref' is defined but never used                                                                         @typescript-eslint/no-unused-vars
  12655:11   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  14650:34   warning  '__w_pdfjs_require__' is defined but never used                                                          @typescript-eslint/no-unused-vars
  16285:192  warning  'perms' is defined but never used                                                                        @typescript-eslint/no-unused-vars
  16463:18   warning  'ex' is defined but never used                                                                           @typescript-eslint/no-unused-vars
  16683:9    error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  16892:11   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  17014:11   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  17043:11   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  17067:11   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  17091:11   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  17171:11   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  17266:18   warning  'ex' is defined but never used                                                                           @typescript-eslint/no-unused-vars
  17306:11   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  17320:11   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  17328:39   warning  'argument' is defined but never used                                                                     @typescript-eslint/no-unused-vars
  17596:11   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  17638:11   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  18087:11   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  18525:11   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  18700:30   warning  'reason' is defined but never used                                                                       @typescript-eslint/no-unused-vars
  23974:11   warning  'xref' is assigned a value but never used                                                                @typescript-eslint/no-unused-vars
  23975:11   warning  'isEvalSupported' is assigned a value but never used                                                     @typescript-eslint/no-unused-vars
  24023:11   warning  'xref' is assigned a value but never used                                                                @typescript-eslint/no-unused-vars
  24024:11   warning  'isEvalSupported' is assigned a value but never used                                                     @typescript-eslint/no-unused-vars
  24083:11   warning  'xref' is assigned a value but never used                                                                @typescript-eslint/no-unused-vars
  24084:11   warning  'isEvalSupported' is assigned a value but never used                                                     @typescript-eslint/no-unused-vars
  24085:11   warning  'fn' is assigned a value but never used                                                                  @typescript-eslint/no-unused-vars
  24099:11   warning  'xref' is assigned a value but never used                                                                @typescript-eslint/no-unused-vars
  24100:11   warning  'isEvalSupported' is assigned a value but never used                                                     @typescript-eslint/no-unused-vars
  24117:11   warning  'fn' is assigned a value but never used                                                                  @typescript-eslint/no-unused-vars
  24142:11   warning  'xref' is assigned a value but never used                                                                @typescript-eslint/no-unused-vars
  24143:11   warning  'isEvalSupported' is assigned a value but never used                                                     @typescript-eslint/no-unused-vars
  24181:11   warning  'xref' is assigned a value but never used                                                                @typescript-eslint/no-unused-vars
  24182:11   warning  'isEvalSupported' is assigned a value but never used                                                     @typescript-eslint/no-unused-vars
  24200:11   warning  'xref' is assigned a value but never used                                                                @typescript-eslint/no-unused-vars
  24564:39   warning  'visitor' is defined but never used                                                                      @typescript-eslint/no-unused-vars
  24892:5    warning  'pdfjsVersion' is assigned a value but never used                                                        @typescript-eslint/no-unused-vars
  24893:5    warning  'pdfjsBuild' is assigned a value but never used                                                          @typescript-eslint/no-unused-vars
  24971:9    error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  25072:9    warning  Expected an assignment or function call and instead saw an expression                                    @typescript-eslint/no-unused-expressions
  25073:16   warning  'e' is defined but never used                                                                            @typescript-eslint/no-unused-vars
  25329:68   warning  'data' is defined but never used                                                                         @typescript-eslint/no-unused-vars
  25335:64   warning  'data' is defined but never used                                                                         @typescript-eslint/no-unused-vars
  25338:60   warning  'data' is defined but never used                                                                         @typescript-eslint/no-unused-vars
  25341:66   warning  'data' is defined but never used                                                                         @typescript-eslint/no-unused-vars
  25344:64   warning  'data' is defined but never used                                                                         @typescript-eslint/no-unused-vars
  25347:58   warning  'data' is defined but never used                                                                         @typescript-eslint/no-unused-vars
  25350:60   warning  'data' is defined but never used                                                                         @typescript-eslint/no-unused-vars
  25353:52   warning  'data' is defined but never used                                                                         @typescript-eslint/no-unused-vars
  25359:54   warning  'data' is defined but never used                                                                         @typescript-eslint/no-unused-vars
  25416:31   warning  'desiredSize' is defined but never used                                                                  @typescript-eslint/no-unused-vars
  25417:33   warning  'reason' is defined but never used                                                                       @typescript-eslint/no-unused-vars
  25443:47   warning  'data' is defined but never used                                                                         @typescript-eslint/no-unused-vars
  25446:51   warning  'data' is defined but never used                                                                         @typescript-eslint/no-unused-vars
  25465:43   warning  'data' is defined but never used                                                                         @typescript-eslint/no-unused-vars
  25660:16   warning  'e' is defined but never used                                                                            @typescript-eslint/no-unused-vars
  25694:56   warning  'mimeType' is defined but never used                                                                     @typescript-eslint/no-unused-vars
  25782:11   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  26096:14   warning  'ex' is defined but never used                                                                           @typescript-eslint/no-unused-vars
  26179:14   warning  'e' is defined but never used                                                                            @typescript-eslint/no-unused-vars
  26700:22   warning  '_' is defined but never used                                                                            @typescript-eslint/no-unused-vars
  26712:40   warning  'blob' is defined but never used                                                                         @typescript-eslint/no-unused-vars
  26725:25   warning  'exports' is defined but never used                                                                      @typescript-eslint/no-unused-vars
  26725:34   warning  '__w_pdfjs_require__' is defined but never used                                                          @typescript-eslint/no-unused-vars
  26924:25   warning  'value' is defined but never used                                                                        @typescript-eslint/no-unused-vars
  26945:25   warning  'separator' is defined but never used                                                                    @typescript-eslint/no-unused-vars
  26948:39   warning  'searchElement' is defined but never used                                                                @typescript-eslint/no-unused-vars
  26954:29   warning  'callbackfn' is defined but never used                                                                   @typescript-eslint/no-unused-vars
  26957:39   warning  'callbackfn' is defined but never used                                                                   @typescript-eslint/no-unused-vars
  26961:11   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  27560:25   warning  'exports' is defined but never used                                                                      @typescript-eslint/no-unused-vars
  27560:34   warning  '__w_pdfjs_require__' is defined but never used                                                          @typescript-eslint/no-unused-vars
  27782:12   warning  'e' is defined but never used                                                                            @typescript-eslint/no-unused-vars
  27875:7    error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  27885:7    error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  27927:31   warning  'executor' is defined but never used                                                                     @typescript-eslint/no-unused-vars
  27982:9    error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  27999:11   warning  Expected an assignment or function call and instead saw an expression                                    @typescript-eslint/no-unused-expressions
  28002:7    warning  Expected an assignment or function call and instead saw an expression                                    @typescript-eslint/no-unused-expressions
  28008:9    error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  28041:25   warning  'exports' is defined but never used                                                                      @typescript-eslint/no-unused-vars
  28041:34   warning  '__w_pdfjs_require__' is defined but never used                                                          @typescript-eslint/no-unused-vars
  28283:30   warning  'source' is defined but never used                                                                       @typescript-eslint/no-unused-vars
  28304:34   warning  '__w_pdfjs_require__' is defined but never used                                                          @typescript-eslint/no-unused-vars
  28470:7    warning  Expected an assignment or function call and instead saw an expression                                    @typescript-eslint/no-unused-expressions
  28519:14   warning  'e' is defined but never used                                                                            @typescript-eslint/no-unused-vars
  28620:12   warning  'e' is defined but never used                                                                            @typescript-eslint/no-unused-vars
  28630:34   warning  '__w_pdfjs_require__' is defined but never used                                                          @typescript-eslint/no-unused-vars
  28645:5    error    Do not assign to the variable `module`. See: https://nextjs.org/docs/messages/no-assign-module-variable  @next/next/no-assign-module-variable
  28808:22   warning  'exports' is defined but never used                                                                      @typescript-eslint/no-unused-vars
  28808:31   warning  '__w_pdfjs_require__' is defined but never used                                                          @typescript-eslint/no-unused-vars
  29420:13   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  29813:13   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  30457:11   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  30721:11   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  31253:14   warning  'e' is defined but never used                                                                            @typescript-eslint/no-unused-vars
  31358:14   warning  'e' is defined but never used                                                                            @typescript-eslint/no-unused-vars
  31608:11   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  31709:44   warning  'obj' is defined but never used                                                                          @typescript-eslint/no-unused-vars
  31709:49   warning  'prop' is defined but never used                                                                         @typescript-eslint/no-unused-vars
  31709:55   warning  'args' is defined but never used                                                                         @typescript-eslint/no-unused-vars
  31712:56   warning  'begin' is defined but never used                                                                        @typescript-eslint/no-unused-vars
  31712:63   warning  'end' is defined but never used                                                                          @typescript-eslint/no-unused-vars
  31718:70   warning  'chunk' is defined but never used                                                                        @typescript-eslint/no-unused-vars
  31758:57   warning  'begin' is defined but never used                                                                        @typescript-eslint/no-unused-vars
  31758:64   warning  'end' is defined but never used                                                                          @typescript-eslint/no-unused-vars
  31788:11   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  31997:11   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  32008:11   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  32078:11   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  32309:11   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  33949:50   warning  'req' is defined but never used                                                                          @typescript-eslint/no-unused-vars
  35079:12   warning  'parseJbig2' is defined but never used                                                                   @typescript-eslint/no-unused-vars
  35381:39   warning  'low' is defined but never used                                                                          @typescript-eslint/no-unused-vars
  35381:44   warning  'high' is defined but never used                                                                         @typescript-eslint/no-unused-vars
  35381:50   warning  'dstLow' is defined but never used                                                                       @typescript-eslint/no-unused-vars
  35384:37   warning  'low' is defined but never used                                                                          @typescript-eslint/no-unused-vars
  35384:42   warning  'high' is defined but never used                                                                         @typescript-eslint/no-unused-vars
  35384:48   warning  'dstLow' is defined but never used                                                                       @typescript-eslint/no-unused-vars
  35387:51   warning  'low' is defined but never used                                                                          @typescript-eslint/no-unused-vars
  35387:56   warning  'high' is defined but never used                                                                         @typescript-eslint/no-unused-vars
  35387:62   warning  'array' is defined but never used                                                                        @typescript-eslint/no-unused-vars
  35390:29   warning  'src' is defined but never used                                                                          @typescript-eslint/no-unused-vars
  35390:34   warning  'dst' is defined but never used                                                                          @typescript-eslint/no-unused-vars
  35892:43   warning  'value' is defined but never used                                                                        @typescript-eslint/no-unused-vars
  36154:27   warning  'map' is defined but never used                                                                          @typescript-eslint/no-unused-vars
  36759:11   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias
  37804:18   warning  'e' is defined but never used                                                                            @typescript-eslint/no-unused-vars
  38178:34   warning  'suggestedLength' is defined but never used                                                              @typescript-eslint/no-unused-vars
  38370:14   warning  'e' is defined but never used                                                                            @typescript-eslint/no-unused-vars
  38433:34   warning  '__w_pdfjs_require__' is defined but never used                                                          @typescript-eslint/no-unused-vars
  38477:35   warning  'end' is defined but never used                                                                          @typescript-eslint/no-unused-vars
  43946:34   warning  '__w_pdfjs_require__' is defined but never used                                                          @typescript-eslint/no-unused-vars
  43957:53   warning  'seed' is defined but never used                                                                         @typescript-eslint/no-unused-vars
  44230:9    warning  'handler' is assigned a value but never used                                                             @typescript-eslint/no-unused-vars
  44635:391  warning  Expected an assignment or function call and instead saw an expression                                    @typescript-eslint/no-unused-expressions
  44892:54   warning  'renderForms' is defined but never used                                                                  @typescript-eslint/no-unused-vars
  44893:11   error    Unexpected aliasing of 'this' to local variable                                                          @typescript-eslint/no-this-alias

✖ 232 problems (50 errors, 182 warnings)
  1 error and 0 warnings potentially fixable with the `--fix` option.


```

## Tests

```

> estudiar-mucho@0.1.0 test
> vitest

◇ injected env (4) from .env.local // tip: ◈ encrypted .env [www.dotenvx.com]

[1m[30m[46m RUN [49m[39m[22m [36mv4.1.4 [39m[90m/home/fer/Documents/Dev/estudiar-mucho[39m

 [32m✓[39m app/__tests__/Hero.test.tsx [2m([22m[2m1 test[22m[2m)[22m[32m 75[2mms[22m[39m
 [32m✓[39m app/__tests__/generate.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 18[2mms[22m[39m
 [32m✓[39m app/__tests__/file.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 9[2mms[22m[39m
 [32m✓[39m app/__tests__/actions.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 13[2mms[22m[39m
 [2m[90m↓[39m[22m app/__tests__/cards.test.ts [2m([22m[2m1 test[22m[2m | [22m[33m1 skipped[39m[2m)[22m
 [2m[90m↓[39m[22m app/__tests__/supabase.test.ts [2m([22m[2m1 test[22m[2m | [22m[33m1 skipped[39m[2m)[22m

[2m Test Files [22m [1m[32m4 passed[39m[22m[2m | [22m[33m2 skipped[39m[90m (6)[39m
[2m      Tests [22m [1m[32m7 passed[39m[22m[2m | [22m[33m2 skipped[39m[90m (9)[39m
[2m   Start at [22m 15:55:56
[2m   Duration [22m 11.97s[2m (transform 444ms, setup 795ms, import 1.18s, tests 114ms, environment 8.19s)[22m


```
  