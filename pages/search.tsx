import React from 'react';
import { Container, ListGroup, Stack, Image, Button, Form, FormControl } from 'react-bootstrap';
import NextLink from '../components/NextLink';
import { Desktop, Mobile } from '../components/Responsive';
import Spinner from '../components/Spinner';
import router, { useRouter } from "next/router";
import { isPersonType, mapSearchTypeName } from '../utils/search';
import { useSearch } from '../hooks/useSearch';
import { useFormik } from 'formik';
import styled from "styled-components"

const SearchPageContainer = styled.div`
  min-height: 100vh;
`
const Search = () => {
   const { query } = useRouter();
   const searchText = query.searchText as string;
   const { results, isLoading, isError } = useSearch(searchText);
   const formik = useFormik({
    initialValues: {
    searchText: ''
    },
    onSubmit: (values: any) => {
        const { searchText } = values;
        router.push(`/search?searchText=${searchText}`)
    },
  });

   if (isError) return <div>Failed to load</div>
   if (isLoading ) return <Spinner />

  return (
      <>
    <Desktop>
        <SearchPageContainer>
    <Container style={{width: "60%", marginTop: "2.5%" }}>
    <div style={{textAlign: "center"}}>
    <h1>Search</h1>
    <Container>
    { results && (
      <>
      <h4>Found {results.totalCount} result{results.totalCount != 1 ? `s`: ""} for {searchText}</h4>
      <hr className="solid" style={{width: "50%", margin: "auto", color: "#FFD000"}}/>
          <ListGroup variant="flush" style={{textAlign: "left"}}>
              {
                  results.items.filter((i: any) => i).map((item: any, index: number) => {
                      const imageSrc = item.thumbnailUrl ? `${item.thumbnailUrl}?w=60&h=60&fm=png&q=100&fit=thumb` : "";

                      if(index == 0)  {
                      return (
                          <NextLink href={item.slug}>
                              <ListGroup.Item style={{padding: "1em", border: "0px"}}>
                              <Stack direction="horizontal" gap={1}>
                              { item.thumbnailUrl && 
                                  (
                                    <div style={{ paddingRight: "0.5em"}}>
                                      { isPersonType(item.type) ? (<Image src={imageSrc} alt={item.title} width="100%" height="100%" style={{borderRadius: "50%"}}/>) : <Image src={imageSrc} alt={item.title} width="100%" height="100%"/> }
                                    </div>
                                  )
                              }
                              <div>
                              <p style={{marginBottom: "0.5em"}}><b>{item.title}</b></p>
                              <p style={{color: "#666C7E", padding: 0, margin: 0}}>{mapSearchTypeName(item.type)}</p>
                              </div>
                              </Stack>
                              </ListGroup.Item>
                          </NextLink>
                      )}
                      else {
                          return (
                          <NextLink href={item.slug}>
                              <ListGroup.Item style={{padding: "1em", borderLeft: "0px", borderRight: "0px", borderBottom: "0px"}}>
                              <Stack direction="horizontal" gap={1}>
                              { item.thumbnailUrl && 
                                  (
                                    <div style={{ paddingRight: "0.5em"}}>
                                      { isPersonType(item.type) ? (<Image src={imageSrc} alt={item.title} width="100%" height="100%" style={{borderRadius: "50%"}}/>) : <Image src={imageSrc} alt={item.title} width="100%" height="100%"/> }
                                    </div>
                                  )
                              }
                              <div>
                              <p><b>{item.title}</b></p>
                              <p style={{color: "#666C7E", padding: 0, margin: 0}}>{mapSearchTypeName(item.type)}</p>
                              </div>
                              </Stack>
                              </ListGroup.Item>
                          </NextLink>
                      ) 
                      }
                  })
              }
          </ListGroup>
      </>
      
    )}
    </Container>
    </div>
    </Container>
    </SearchPageContainer>
    </Desktop>
    <Mobile>
    <SearchPageContainer>
    <Container style={{ marginTop: "2.5%" }}>
              <div style={{textAlign: "center"}}>
              <h1>Search</h1>
              <Container>
              { results && (
                <>
                <h4>Found {results.totalCount} result{results.totalCount != 1 ? `s`: ""} for {searchText}</h4>
                <div style={{marginBottom: "1em"}}>
                    <Form className="d-flex" onSubmit={formik.handleSubmit}>
                        <FormControl
                            id="searchText"
                            name="searchText"
                            type="search"
                            placeholder="Search for Track, Loop, Artist, Loopmaker"
                            className="me-2"
                            aria-label="Search"
                            value={formik.values.searchText}
                            onChange={formik.handleChange}
                        />
                        <Button variant="success" type="submit">Search</Button>
                    </Form>
                </div>
                <hr className="solid" style={{width: "50%", margin: "auto", color: "#FFD000"}}/>
                    <ListGroup variant="flush" style={{textAlign: "left"}}>
                        {
                            results.items.filter((i: any) => i).map((item: any, index: any) => {
                                const imageSrc = item.thumbnailUrl ? `${item.thumbnailUrl}?w=60&h=60&fm=png&q=100&fit=thumb` : "";

                                if(index == 0)  {
                                return (
                                    <NextLink href={item.slug}>
                                        <ListGroup.Item style={{padding: "1em", border: "0px"}}>
                                        <Stack direction="horizontal" gap={1}>
                                        { item.thumbnailUrl &&
                                            (<div style={{ paddingRight: "0.5em"}}>
                                                <Image src={imageSrc} alt={item.title}/>
                                            </div>)
                                        }
                                        <div>
                                        <p style={{marginBottom: "0.5em"}}><b>{item.title}</b></p>
                                        <p style={{color: "#666C7E", padding: 0, margin: 0}}>{mapSearchTypeName(item.type)}</p>
                                        </div>
                                        </Stack>
                                        </ListGroup.Item>
                                    </NextLink>
                                )}
                                else {
                                    return (
                                    <NextLink href={item.slug}>
                                        <ListGroup.Item style={{padding: "1em", borderLeft: "0px", borderRight: "0px", borderBottom: "0px"}}>
                                        <Stack direction="horizontal" gap={1}>
                                        { item.thumbnailUrl &&
                                            (<div style={{ paddingRight: "0.5em"}}>
                                                <Image src={imageSrc} alt={item.title}/>
                                            </div>)
                                        }
                                        <div>
                                        <p><b>{item.title}</b></p>
                                        <p style={{color: "#666C7E", padding: 0, margin: 0}}>{mapSearchTypeName(item.type)}</p>
                                        </div>
                                        </Stack>
                                        </ListGroup.Item>
                                    </NextLink>
                                ) 
                                }
                            })
                        }
                    </ListGroup>
                </>
                
              )}
            </Container>
              </div>
              </Container>
              </SearchPageContainer>
    </Mobile>
    </>
  )
};

export default Search;
