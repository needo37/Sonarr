﻿using Newtonsoft.Json;
using Sonarr.Http.REST;

namespace NzbDrone.Api.Profiles.Languages
{
    public class LanguageResource : RestResource
    {
        [JsonProperty(DefaultValueHandling = DefaultValueHandling.Include)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string NameLower { get { return Name.ToLowerInvariant(); } }
    }
}